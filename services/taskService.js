const TaskRepository = require("../repositories/taskRepository");

/**
 * Provides task-related operations.
 *
 * @method readTasks
 * @returns {Promise<Object[]>} A promise resolving to a list of tasks.
 *
 * @method readTask
 * @param {number} id - Task identifier.
 * @returns {Promise<Object>} A promise resolving to the task details.
 *
 * @method createTask
 * @param {string} type - The type of the task ('note' or 'task').
 * @param {number} project_id - The associated project identifier.
 * @param {number} created_by - The identifier for the user who created the task.
 * @param {number} assigned_to - The identifier for the user assigned to the task.
 * @param {number} completed_by - The identifier for the user who completed the task.
 * @param {Date|string} due_date - The due date of the task.
 * @param {string} task_description - The description of the task.
 * @param {string} importance_level - The importance level of the task ('Critical', 'High', 'Medium', 'Low', 'Optional').
 * @returns {Promise<Object>} A promise resolving to the newly created task.
 *
 * @method updateTask
 * @param {number} id - The task identifier.
 * @param {string} type - The type of the task ('note' or 'task').
 * @param {number} project_id - The associated project identifier.
 * @param {number} created_by - The identifier for the user who created the task.
 * @param {number} assigned_to - The identifier for the user assigned to the task.
 * @param {number} completed_by - The identifier for the user who completed the task.
 * @param {Date|string} due_date - The due date of the task.
 * @param {string} task_description - The description of the task.
 * @param {string} importance_level - The importance level of the task ('Critical', 'High', 'Medium', 'Low', 'Optional').
 * @returns {Promise<Object>} A promise resolving to the updated task.
 *
 * @method deleteTask
 * @param {number} id - The task identifier.
 * @returns {Promise<void>} A promise resolving when the task deletion is complete.
 */


class TaskService {
    static async readTasks() {
        return TaskRepository.readTasks();
    }

    static async readTask(id) {
        return TaskRepository.readTask(id);
    }

    static async createTask( type, project_id, created_by, assigned_to, completed_by, due_date, task_description, importance_level) {
        console.log("hello");
        console.log(project_id, created_by)
        return TaskRepository.createTask( type, project_id, created_by, assigned_to, completed_by, due_date, task_description, importance_level);
    }

    static async updateTask(id, type, project_id, created_by, assigned_to, completed_by, due_date, task_description, importance_level) {
        return TaskRepository.updateTask(id, type, project_id, created_by, assigned_to, completed_by, due_date, task_description, importance_level);
    }

    static async deleteTask(id) {
        return TaskRepository.deleteTask(id);
    }
}

module.exports = TaskService;