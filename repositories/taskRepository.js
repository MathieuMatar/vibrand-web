const Task = require('../models/Task');

class TaskRepository {
    static async readTasks() {
        try {
            return await Task.findAll();
        } catch (error) {
            console.error(error);
            return { success: false, message: "Failed to read tasks." };
        }
    }

    static async readTask(id) {
        try {
            return await Task.findByPk(id);
        } catch (error) {
            console.error(error);
            return { success: false, message: "Failed to read task." };
        }
    }

    static async createTask(type, project_id, created_by, assigned_to, completed_by, due_date, task_description, importance_level) {
        try {
            const newTask = await Task.create(
                { type, project_id, created_by, assigned_to, completed_by, due_date, task_description, importance_level }
            );
            return newTask;
        } catch (error) {
            console.error(error);
            return { success: false, message: "Failed to create task." };
        }
    }

    static async updateTask(id, type, project_id, created_by, assigned_to, completed_by, due_date, task_description, importance_level) {
        try {
            await Task.update(
                { type, project_id, created_by, assigned_to, completed_by, due_date, task_description, importance_level},
                { where: { id } }
            );
            return { success: true, message: "Task updated successfully." };
        } catch (error) {
            console.error(error);
            console.error("Error updating task:", error);
            return { success: false, message: "Failed to update task." };
        }
    }

    static async deleteTask(id) {
        try {
            const deleted = await Task.destroy({ where: { id } });
            if (deleted === 0) {
                return { success: false, message: "No task found to delete." };
            }
            return { success: true };
        } catch (error) {
            console.error(error);
            return { success: false, message: "Failed to delete task." };
        }
    }
}
module.exports = TaskRepository;