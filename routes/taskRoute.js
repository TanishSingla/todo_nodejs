import express from "express";
import { createTask, deleteTask, getMyTasks, updateTasks } from "../controllers/task.js";
import { isLoggedIn } from "../middleware/auth.js";

const router = express.Router();

router.post("/new", isLoggedIn, createTask);
router.get("/mytasks", isLoggedIn, getMyTasks);
router.route("/:id").put(isLoggedIn, updateTasks).delete(isLoggedIn, deleteTask);

export default router;