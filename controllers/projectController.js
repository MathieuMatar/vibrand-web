const projectService = require('../services/projectService');

/**
 * Controller for handling project-related operations.
 *
 * @class ProjectController
 */

/**
 * @function getProjects
 * @memberof ProjectController
 * @description Retrieves a list of all projects.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */

/**
 * @function getProject
 * @memberof ProjectController
 * @description Retrieves a single project by its ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */

/**
 * @function createProject
 * @memberof ProjectController
 * @description Creates a new project.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */

/**
 * @function updateProject
 * @memberof ProjectController
 * @description Updates an existing project by ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */

/**
 * @function deleteProject
 * @memberof ProjectController
 * @description Deletes a project by ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */

/**
 * @function associateUserWithProject
 * @memberof ProjectController
 * @description Associates a user with a project.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */

/**
 * @function removeUserFromProject
 * @memberof ProjectController
 * @description Removes a user from a project.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */

/**
 * @function linkServiceToProject
 * @memberof ProjectController
 * @description Links a service to a project.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */

/**
 * @function unlinkServiceFromProject
 * @memberof ProjectController
 * @description Unlinks a service from a project.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */



class ProjectController {
    static async getProjects(req, res) {
        try {
            const result = await projectService.readProjects();
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while retrieving the projects' });
        }
    }

    static async getProject(req, res) {
        try {
            const { id } = req.params;
            const result = await projectService.readProject(id);
            if (!result) {
                return res.status(404).json({ error: 'Project not found' });
            }
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while retrieving the project' });
        }
    }

    static async createProject(req, res) {
        try {
            const { name, description, client_id, start_date, deadline, status, overview, files } = req.body;
            const result = await projectService.createProject(name, description, client_id, start_date, deadline, status, overview, files);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while creating the project' });
        }
    }

    static async updateProject(req, res) {
        try {
            const { id } = req.params;
            const { name, description, client_id, start_date, deadline, status, overview, files } = req.body;
            const result = await projectService.updateProject(id, name, description, client_id, start_date, deadline, status, overview, files);
            if (!result) {
                return res.status(404).json({ error: 'Project not found' });
            }
            res.status(200).json({ message: 'Project updated successfully' });
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while updating the project' });
        }
    }

    static async deleteProject(req, res) {
        try {
            const { id } = req.params;
            const result = await projectService.deleteProject(id);
            if (!result) {
                return res.status(404).json({ error: 'Project not found' });
            }
            res.status(200).json({ message: 'Project deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while deleting the project' });
        }
    }

    static async associateUserWithProject(req, res) {
        try {
            const { project_id, user_id } = req.params;
            const result = await projectService.associateUserWithProject(project_id, user_id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while associating the user with the project' });
        }
    }

    static async removeUserFromProject(req, res) {
        try {
            const { project_id, user_id } = req.params;
            const result = await projectService.removeUserFromProject(project_id, user_id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while removing the user from the project' });
        }
    }

    static async linkServiceToProject(req, res) {
        try {
            const { project_id, service_id } = req.params;
            const result = await projectService.linkServiceToProject(project_id, service_id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while linking the service to the project' });
        }
    }

    static async unlinkServiceFromProject(req, res) {
        try {
            const { project_id, service_id } = req.params;
            const result = await projectService.unlinkServiceFromProject(project_id, service_id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while unlinking the service from the project' });
        }
    }
}

module.exports = ProjectController;