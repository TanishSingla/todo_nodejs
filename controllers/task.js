import ErrorHandler from "../middleware/error.js";
import { Task } from "../models/task.js";

export const createTask = async (req, resp, next) => {

    try {
        const { title, description } = req.body;

        await Task.create({
            title,
            description,
            user: req.user
        });

        resp.status(201).json({
            suceess: true,
            message: "Task Added Successfully"
        });

    } catch (error) {
        next(error);
    }
};

export const getMyTasks = async (req, resp, next) => {

    try {
        const userId = req.user._id;
        const tasks = await Task.find({ user: userId });

        if (!tasks) return next(new ErrorHandler("Task Not Found", 404));

        resp.status(200).json({
            success: true,
            tasks,
        })

    } catch (error) {
        next(error);
    }
};

export const updateTasks = async (req, resp, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) return next(new ErrorHandler("Task Not Found", 404));

        task.isCompleted = !task.isCompleted;
        await task.save();

        resp.status(200).json({
            success: true,
            message: "Task Updated",
        })
    } catch (error) {
        next(error);
    }
};
export const deleteTask = async (req, resp, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) return next(new ErrorHandler("Task Not Found", 404));
        await task.deleteOne();

        resp.status(200).json({
            success: true,
            message: "Task Deleted",
        })
    } catch (error) {
        next(error);
    }
};


