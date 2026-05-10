const express = require("express");
const { getUserTasks, createTask, updateTask, deleteTask, } = require("../controllers/taskController");
const { authMiddleware } = require("../middleware/authUser");
const router = express.Router();

router.get("/", authMiddleware, getUserTasks);
router.post("/", authMiddleware, createTask);
router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);

module.exports = router;