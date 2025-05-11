const projectService = require('../services/projectService');
const ClientService = require('../services/clientService');
const UserService = require('../services/userService');
const TaskService = require('../services/taskService');

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
            const tasks = project.Tasks;

            // Sort tasks: incomplete (no completed_by) first
            tasks.sort((a, b) => {
                return (a.completed_by ? 1 : 0) - (b.completed_by ? 1 : 0);
            });

            res.render('admin/user-task', { tasks, id, projectId });
        } catch (error) {
            console.error('Error rendering user tasks:', error);
            res.status(500).send('Internal Server Error');
        }
    }


    //router.get('/task/:id/:user/:project', ViewsController.renderSingleTask);
    static async renderSingleTask(req, res) {
        const { id, user, project } = req.params;
        try {
            //const task = await projectService.readTask(id);
            const task = await TaskService.readTask(id);
            res.render('admin/task', { task, user, project });
        } catch (error) {
            console.error('Error rendering single task:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    static async renderNewTask(req, res) {
        const { user, project } = req.params;
        try {
            const task2 = await TaskService.createTask(null, project, user, null, null, null, null, null);
            const newId = task2.id;
            const task = await TaskService.readTask(newId);
            res.render('admin/task', { task, user, project });
            //res.render('admin/task', { task, user, project });
        } catch (error) {
            console.error('Error rendering new task:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    static async renderProjectInfo(req, res) {
        const { id } = req.params;
        try {
            const project = await projectService.readProject(id);
            res.render('admin/project-info', { project });
        } catch (error) {
            console.error('Error rendering project info:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    static async renderAllUserTasks(req, res) {
        const { id } = req.params;
        try {
            const user = await UserService.readUser(id);
            const tasks = user.Tasks;
            tasks.sort((a, b) => {
                return (a.completed_by ? 1 : 0) - (b.completed_by ? 1 : 0);
            });

            const projectId = null;

            res.render('admin/user-task', { tasks, id, projectId });
        } catch (error) {
            console.error('Error rendering user tasks:', error);
            res.status(500).send('Internal Server Error');
        }
    }


}

module.exports = ViewsController;