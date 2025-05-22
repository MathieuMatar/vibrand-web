const express = require('express');
const TaskController = require('../controllers/taskController');
const { validateTask, validateTaskId } = require('../validators/taskDTO');

const router = express.Router();

/**
GET /api/tasks
Retrieves all tasks from the database.

GET /api/tasks/:id
Retrieves a specific task by ID.
@param {string} id - Task ID

POST /api/tasks
Creates a new task.
Request body:
{
  type: ENUM('note', 'task'),
  project_id: number,
  created_by: number,
  assigned_to: number,
  completed_by: number,
  due_date: string (YYYY-MM-DD),
  task_description: string,
  importance_level: ENUM('Critical', 'High', 'Medium', 'Low', 'Optional')
}

PUT /api/tasks/:id
Updates an existing task by ID.
@param {string} id - Task ID
Request body:
{
  type: ENUM('note', 'task'),
  project_id: number,
  created_by: number,
  assigned_to: number,
  completed_by: number,
  due_date: string (YYYY-MM-DD),
  task_description: string,
  importance_level: ENUM('Critical', 'High', 'Medium', 'Low', 'Optional')
}

DELETE /api/tasks/:id
Deletes a task by ID.
@param {string} id - Task ID

*/

router.get('/', TaskController.readTasks);
router.get('/:id', TaskController.readTask);
router.post('/', TaskController.createTask);
router.put('/:id', TaskController.updateTask);
router.delete('/:id', TaskController.deleteTask);

module.exports = router;