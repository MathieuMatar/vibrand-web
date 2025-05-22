const Task = require('../models/Task');

/**
 * The TaskRepository class handles database operations for the Task model.
 *
 * @method readTasks
 * @returns {Promise<Array|Object>} Returns array of tasks on success, or error object on failure.
 * @description Retrieves all tasks from the database.
 *
 * @method readTask
 * @param {number} id - The ID of the task to retrieve.
 * @returns {Promise<Object|null>} Returns task object on success, null if not found, or error object on failure.
 * @description Retrieves a single task by its ID.
 *
 * @method createTask
 * @param {string} type - The type of task ('note' or 'task').
 * @param {number} project_id - The ID of the project the task belongs to (optional).
 * @param {number} created_by - The ID of the user who created the task (optional).
 * @param {number} assigned_to - The ID of the user the task is assigned to (optional).
 * @param {number} completed_by - The ID of the user who completed the task (optional).
 * @param {Date} due_date - The due date of the task (optional).
 * @param {string} task_description - The description of the task (optional).
 * @param {string} importance_level - The importance level ('Critical', 'High', 'Medium', 'Low', 'Optional') (optional).
 * @returns {Promise<Object>} Returns created task object on success, or error object on failure.
 * @description Creates a new task.
 *
 * @method updateTask
 * @param {number} id - The ID of the task to update.
 * @param {string} type - The type of task ('note' or 'task').
 * @param {number} project_id - The ID of the project the task belongs to (optional).
 * @param {number} created_by - The ID of the user who created the task (optional).
 * @param {number} assigned_to - The ID of the user the task is assigned to (optional).
 * @param {number} completed_by - The ID of the user who completed the task (optional).
 * @param {Date} due_date - The due date of the task (optional).
 * @param {string} task_description - The description of the task (optional).
 * @param {string} importance_level - The importance level ('Critical', 'High', 'Medium', 'Low', 'Optional') (optional).
 * @returns {Promise<Object>} Returns success object with message on success, or error object on failure.
 * @description Updates an existing task.
 *
 * @method deleteTask
 * @param {number} id - The ID of the task to delete.
 * @returns {Promise<Object>} Returns success object on successful deletion, or error object on failure.
 * @description Removes a task.
 */

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