const rateLimit = require("express-rate-limit");
const { registerUser, loginUser, deleteAccount, getAllUsersWithTasks } = require("../controllers/authControl");
const express=require("express");
const { authMiddleware, isAdmin } = require("../middleware/authUser");
const router=express.Router()

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5, 
  message: "Too many attempts, try later"
});


router.post("/register", registerUser)
router.post("/login", limiter, loginUser)
// router.delete("/delete-account", authMiddleware ,deleteAccount)
router.get(
  "/admin/users",
  authMiddleware,
  isAdmin,
  getAllUsersWithTasks
);

module.exports = router;