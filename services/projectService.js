const ProjectRepository = require('../repositories/projectRepository');

/**
 * Provides project-related operations.
 *
 * @method readProjects
 * @returns {Promise<Object[]>} A promise resolving to a list of projects with their related entities.
 *
 * @method readProject
 * @param {number} id - Project identifier.
 * @returns {Promise<Object>} A promise resolving to the project details with related entities.
 *
 * @method createProject
 * @param {string} name - The project name.
 * @param {string} description - The project description.
 * @param {number} client_id - The identifier of the project client.
 * @param {string} start_date - The start date of the project.
 * @param {string} deadline - The deadline of the project.
 * @param {string} status - The status of the project.
 * @param {string} overview - A brief description of the project.
 * @param {string} files - Files associated with the project.
 * @returns {Promise<Object>} A promise resolving to the newly created project.
 *
 * @method updateProject
 * @param {number} id - The project identifier.
 * @param {string} name - The project name.
 * @param {string} description - The project description.
 * @param {number} client_id - The identifier of the project client.
 * @param {string} start_date - The start date of the project.
 * @param {string} deadline - The deadline of the project.
 * @param {string} status - The status of the project.
 * @param {string} overview - A brief description of the project.
 * @param {string} files - Files associated with the project.
 * @returns {Promise<Object>} A promise resolving to an object with success status and message.
 *
 * @method deleteProject
 * @param {number} id - The project identifier.
 * @returns {Promise<Object>} A promise resolving to an object with success status and message.
 *
 * @method associateUserWithProject
 * @param {number} project_id - The project identifier.
 * @param {number} user_id - The user identifier.
 * @returns {Promise<Object>} A promise resolving to an object with success status and message.
 *
 * @method removeUserFromProject
 * @param {number} project_id - The project identifier.
 * @param {number} user_id - The user identifier.
 * @returns {Promise<Object>} A promise resolving to an object with success status and message.
 *
 * @method linkServiceToProject
 * @param {number} project_id - The project identifier.
 * @param {number} service_id - The service identifier.
 * @returns {Promise<Object>} A promise resolving to an object with success status and message.
 *
 * @method unlinkServiceFromProject
 * @param {number} project_id - The project identifier.
 * @param {number} service_id - The service identifier.
 * @returns {Promise<Object>} A promise resolving to an object with success status and message.
 */


class projectService{
    static async readProjects(){
        return ProjectRepository.readProjects();
    }

    static async readProject(id){
        return ProjectRepository.readProject(id);
    }

    static async createProject(name, description, client_id, start_date, deadline, status, overview, files){
        return ProjectRepository.createProject(name, description, client_id, start_date, deadline, status, overview, files);
    }

    static async updateProject(id, name, description, client_id, start_date, deadline, status, overview, files){
        return ProjectRepository.updateProject(id, name, description, client_id, start_date, deadline, status, overview, files);
    }

    static async deleteProject(id){
        return ProjectRepository.deleteProject(id);
    }

    static async associateUserWithProject(project_id, user_id) {
        return ProjectRepository.associateUserWithProject(project_id, user_id);
    }

    static async removeUserFromProject(project_id, user_id) {
        return ProjectRepository.removeUserFromProject(project_id, user_id);
    }


    static async linkServiceToProject(project_id, service_id) {
        return ProjectRepository.linkServiceToProject(project_id, service_id);
    }

    static async unlinkServiceFromProject(project_id, service_id) {
        return ProjectRepository.unlinkServiceFromProject(project_id, service_id);
    }
    


}

module.exports = projectService;

