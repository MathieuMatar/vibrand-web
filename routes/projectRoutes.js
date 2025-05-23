const express = require('express');
const projectController = require('../controllers/projectController');
const milestoneController = require('../controllers/milestoneController');
const { validateProject, validateProjectId } = require('../validators/projectDTO');
const { validateMilestone } = require('../validators/milestoneDTO');

const router = express.Router();

/**
 * @route GET /api/projects
 * @description Retrieves all projects
 * @returns {Array<Object>} 200 - List of projects
 */
router.get('/', projectController.getProjects);

/**
 * @route POST /api/projects
 * @description Creates a new project
 * @body {string} name
 * @body {string} description
 * @body {int} client_id
 * @body {string} start_date - ISO date
 * @body {string} deadline - ISO date
 * @body {string} status
 * @body {string} overview
 * @body {string} files
 * @returns {Object} 201 - Created project
 */
router.post('/', validateProject, projectController.createProject);

/**
 * @route GET /api/projects/:id
 * @description Retrieves a project by ID
 * @param {string} id.path.required - Project ID
 */
router.get('/:id', validateProjectId, projectController.getProject);

/**
 * @route DELETE /api/projects/:id
 * @description Deletes a project by ID
 * @param {string} id.path.required - Project ID
 */
router.delete('/:id', validateProjectId, projectController.deleteProject);

/**
 * @route PUT /api/projects/:id
 * @description Updates a project by ID
 * @param {string} id.path.required - Project ID
 * @body Same as POST /api/projects
 */
router.put('/:id', validateProjectId, projectController.updateProject);

/**
 * @route POST /api/projects/:project_id/users/:user_id
 * @description Assigns a user (employee) to a project
 * @param {string} project_id.path.required
 * @param {string} user_id.path.required
 */
router.post('/:project_id/users/:user_id', projectController.associateUserWithProject);

/**
 * @route DELETE /api/projects/:project_id/users/:user_id
 * @description Unassigns a user (employee) from a project
 * @param {string} project_id.path.required
 * @param {string} user_id.path.required
 */
router.delete('/:project_id/users/:user_id', projectController.removeUserFromProject);

/**
 * @route POST /api/projects/:project_id/services/:service_id
 * @description Links a service to a project
 * @param {string} project_id.path.required
 * @param {string} service_id.path.required
 */
router.post('/:project_id/services/:service_id', projectController.linkServiceToProject);

/**
 * @route DELETE /api/projects/:project_id/services/:service_id
 * @description Unlinks a service from a project
 * @param {string} project_id.path.required
 * @param {string} service_id.path.required
 */
router.delete('/:project_id/services/:service_id', projectController.unlinkServiceFromProject);

/**
 * @route POST /api/projects/:id/milestones
 * @description Creates a milestone for a project
 * @param {string} id.path.required - Project ID
 * @body {string} name
 * @body {string} description
 * @body {string} date - ISO date
 * @body {string} due_date - ISO date
 * @body {string} status
 */
router.post('/:id/milestones', validateMilestone, milestoneController.createMilestone);

/**
 * @route PUT /api/projects/milestones/:id
 * @description Updates a milestone
 * @param {string} id.path.required - Milestone ID
 * @body {int} project_id
 * @body {string} name
 * @body {string} description
 * @body {string} date - ISO date
 * @body {string} due_date - ISO date
 * @body {string} status
 */
router.put('/milestones/:id', milestoneController.updateMilestone);

/**
 * @route DELETE /api/projects/milestones/:id
 * @description Deletes a milestone
 * @param {string} id.path.required - Milestone ID
 */
router.delete('/milestones/:id', milestoneController.deleteMilestone);

module.exports = router;
