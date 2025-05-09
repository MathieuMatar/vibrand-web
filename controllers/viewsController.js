const projectService = require('../services/projectService');
const ClientService = require('../services/clientService');
const UserService = require('../services/userService');

class ViewsController {
    static async renderPage(req, res) {
        const projects = await projectService.readProjects();
        const clients = await ClientService.readClients();
        res.render('index', { projects, clients });
    }

    static async getUserPage(req, res) {
        const { id } = req.params;
        //const employeeID = await employeeService.getEmployeeIdByName(name);
        //fetch users from /api/users/35
        const user = await UserService.readUser(id);
        res.render('admin', { user });

    }

    static async renderUserProject(req, res) {
        const { id, projectId } = req.params;
        const project = await projectService.readProject(projectId);
        res.render('admin/user-project', { project, id });
    }

static async renderUserTask(req, res) {
    const { id, projectId } = req.params;

    try {
        const project = await projectService.readProject(projectId);

        const tasks = project.Tasks.map(task => task.dataValues);
        res.render('project/user-task', { tasks, id, projectId });
    } catch (error) {
        console.error('Error rendering user tasks:', error);
        res.status(500).send('Internal Server Error');
    }
}

}

module.exports = ViewsController;