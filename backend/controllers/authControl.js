const validator = require("validator");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Task = require("../models/Task");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password ) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email", success: false });
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({
        message: "Password must contain uppercase, lowercase, number & symbol",
        success: false,
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email already used", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    // default role assigned internally
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      userType: "user",});

    const token = jwt.sign(
      {
        userId: user._id,
        userType: user.userType,
      },
      process.env.JWT_SECRET,
      { expiresIn: "15d" }
    );

    user.lastActive = new Date();
    await user.save();

    return res.status(201).json({
      message: "Registered and logged in successfully",
      success: true,
      token,
      user: {
        name: user.name,
        email: user.email,
        userType: user.userType,
        userId: user._id,
        lastActive: user.lastActive,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      success: false,
      error: error.message,
    });
  }
};

exports.loginUser = async (req, res) => { 
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
 
    // CREATE TOKEN
    const token = jwt.sign(
      {
        userId: user._id,
        userType: user.userType,
      },
      process.env.JWT_SECRET,
      { expiresIn: "15d" },
    );

    res.json({
      token,
      user: {
        name: user.name,
        email: user.email,
        userType: user.userType,
        userId: user._id,
        lastActive: user.lastActive,
      },
      success: true,
      message: "Login successfull",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Server Error", success: false, error: error.message });
  }
};

// // /api/auth/delete-account
// exports.deleteAccount = async (req, res) => {
//   try {
//     // req.userId is set by your auth middleware (after verifying JWT)
//     const userId = req.user.userId;

//     if (!userId) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }
    
//     // Delete the user
//     const deletedUser = await User.findByIdAndDelete(userId);

//     if (!deletedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     return res.status(200).json({ message: "Account deleted successfully" });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

exports.getAllUsersWithTasks = async (req, res) => {
  try {
    // FETCH ALL USERS
    const users = await User.find().select("-password");

    // ATTACH TASKS TO EACH USER
    const usersWithTasks = await Promise.all(
      users.map(async (user) => {
        const tasks = await Task.find({
          createdBy: user._id,
        }).sort({
          createdAt: -1,
        });

        return {
          ...user.toObject(),
          tasks,
        };
      })
    );

    res.status(200).json({
      success: true,
      users: usersWithTasks,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};