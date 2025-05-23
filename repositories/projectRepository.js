const { Project, Employee, Service, Milestone, Task, User, syncDB, sequelize } = require('../models/associations');

/**
 * The ProjectRepository class handles database operations for the Project model.
 *
 * @method readProjects
 * @description Retrieves all projects including related Milestones, Services, Users, and Tasks.
 *
 * @method readProject
 * @param {number} id - The ID of the project to retrieve.
 * @description Retrieves a single project by ID including related Milestones, Services, Users, and Tasks.
 *
 * @method createProject
 * @param {string} name - The name of the project.
 * @param {string} description - The description of the project.
 * @param {number} client_id - The ID of the client the project belongs to.
 * @param {Date} start_date - The start date of the project.
 * @param {Date} deadline - The deadline of the project.
 * @param {string} status - The status of the project.
 * @param {string} overview - An overview of the project.
 * @param {string} files - Files associated with the project.
 * @description Creates a new project.
 *
 * @method updateProject
 * @param {number} id - The ID of the project to update.
 * @param {string} name - The name of the project.
 * @param {string} description - The description of the project.
 * @param {number} client_id - The ID of the client the project belongs to.
 * @param {Date} start_date - The start date of the project.
 * @param {Date} deadline - The deadline of the project.
 * @param {string} status - The status of the project.
 * @param {string} overview - An overview of the project.
 * @param {string} files - Files associated with the project.
 * @description Updates an existing project.
 *
 * @method deleteProject
 * @param {number} id - The ID of the project to delete.
 * @description Removes a project.
 *
 * @method associateUserWithProject
 * @param {number} project_id - The ID of the project.
 * @param {number} user_id - The ID of the user to associate.
 * @description Associates a user with a project.
 *
 * @method removeUserFromProject
 * @param {number} project_id - The ID of the project.
 * @param {number} user_id - The ID of the user to remove.
 * @description Removes a user from a project.
 *
 * @method linkServiceToProject
 * @param {number} project_id - The ID of the project.
 * @param {number} service_id - The ID of the service to link.
 * @description Links a service to a project.
 *
 * @method unlinkServiceFromProject
 * @param {number} project_id - The ID of the project.
 * @param {number} service_id - The ID of the service to unlink.
 * @description Unlinks a service from a project.
 */


class ProjectRepository {
    static async readProjects() {
        try {
            const projects = await Project.findAll({
                include: [
                    { model: Milestone },
                    { model: Service },
                    { model: User },
                    { model: Task }
                ]

            });
            return projects;
        } catch (error) {
            console.error("Error reading projects:", error);
            return { success: false, message: "Failed to read projects." };
        }
    }

    static async readProject(id) {
        try {
            const project = await Project.findByPk(id, {
                include: [
                    { model: Milestone },
                    { model: Service },
                    { model: User },
                    { model: Task }
                ]
            });
            return project;
        } catch (error) {
            console.error("Error reading project:", error);
            return { success: false, message: "Failed to read project." };
        }
    }


    static async createProject(name, description, client_id, start_date, deadline, status, overview, files) {
        try {
            const createdProject = await Project.create(
                { name, description, client_id, start_date, deadline, status, overview, files }
            );
            return createdProject;
        } catch (error) {
            console.error("Error creating project:", error);
            return { success: false, message: "Failed to create project." };
        }
    }

    static async updateProject(id, name, description, client_id, start_date, deadline, status, overview, files) {
        try {
            await Project.update(
                { name, description, client_id, start_date, deadline, status, overview, files },
                { where: { id } }
            );
            return { success: true, message: "Project updated successfully." };
        } catch (error) {
            console.error("Error updating project:", error);
            return { success: false, message: "Failed to update project." };
        }
    }

    static async deleteProject(id) {
        try {
            const deleted = await Project.destroy({ where: { id } });
            if (deleted === 0) {
                return { success: false, message: "No project found to delete." };
            }
            return { success: true, message: "Project deleted successfully." };
        } catch (error) {
            console.error("Error deleting project:", error);
            return { success: false, message: "Failed to delete project." };
        }
    }

    static async associateUserWithProject(project_id, user_id) {
        try {
            const project = await Project.findByPk(project_id);
            const user = await User.findByPk(user_id);

            if (!project || !user) {
                return { success: false, message: "Invalid project or user ID." };
            }

            await project.addUser(user);
            return { success: true, message: "User associated with project." };
        } catch (error) {
            console.error("Error associating user:", error);
            return { success: false, message: "Failed to associate user." };
        }
    }

    static async removeUserFromProject(project_id, user_id) {
        try {
            const project = await Project.findByPk(project_id);
            const user = await User.findByPk(user_id);

            if (!project || !user) {
                return { success: false, message: "Invalid project or user ID." };
            }

            await project.removeUser(user);
            return { success: true, message: "User removed from project." };
        } catch (error) {
            console.error("Error removing user:", error);
            return { success: false, message: "Failed to remove user." };
        }
    }

    static async linkServiceToProject(project_id, service_id) {
        try {
            const project = await Project.findByPk(project_id);
            const service = await Service.findByPk(service_id);

            if (!project || !service) {
                return { success: false, message: "Invalid project or service ID." };
            }

            await project.addService(service);
            return { success: true, message: "Service linked to project." };
        } catch (error) {
            console.error("Error linking service:", error);
            return { success: false, message: "Failed to link service." };
        }
    }

    static async unlinkServiceFromProject(project_id, service_id) {
        try {
            const project = await Project.findByPk(project_id);
            const service = await Service.findByPk(service_id);

            if (!project || !service) {
                return { success: false, message: "Invalid project or service ID." };
            }

            await project.removeService(service);
            return { success: true, message: "Service unlinked from project." };
        } catch (error) {
            console.error("Error unlinking service:", error);
            return { success: false, message: "Failed to unlink service." };
        }
    }

}

module.exports = ProjectRepository;