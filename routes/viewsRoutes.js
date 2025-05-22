const express = require('express');
const router = express.Router();

const projectService = require('../services/projectService');
const ClientService = require('../services/clientService');
const serviceService = require('../services/serviceService');
const UserService = require('../services/userService');

const ViewsController = require('../controllers/viewsController');

/**
GET /
GET /projects
GET /clients
GET /services
GET /sacredbranding
GET /login
Renders basic public or user-facing pages.
*/

const pages = ['/', '/projects', '/clients', '/services', '/sacredbranding', '/login'];
pages.forEach((page) => {
    router.get(page, ViewsController.renderPage);
});

/**
GET /user/:id
Renders the main user dashboard.
@param {string} id - User ID
*/
router.get('/user/:id', ViewsController.getUserPage);

/**
GET /user/:id/project/:projectId
Renders details of a specific project for a user.
@param {string} id - User ID
@param {string} projectId - Project ID
*/
router.get('/user/:id/project/:projectId', ViewsController.renderUserProject);

/**
GET /user/:id/project/:projectId/task
Renders tasks within a specific user project.
@param {string} id - User ID
@param {string} projectId - Project ID
*/
router.get('/user/:id/project/:projectId/task', ViewsController.renderUserTask);

/**
GET /task/new/:user/:project
Renders form to create a new task.
@param {string} user - User ID
@param {string} project - Project ID
*/
router.get('/task/new/:user/:project', ViewsController.renderNewTask);

/**
GET /task/:id/:user/:project
Renders a single task.
@param {string} id - Task ID
@param {string} user - User ID
@param {string} project - Project ID
*/
router.get('/task/:id/:user/:project', ViewsController.renderSingleTask);

/**
GET /project-info/:id
Displays full project information.
@param {string} id - Project ID
*/
router.get('/project-info/:id', ViewsController.renderProjectInfo);

/**
GET /user-tasks/:id
Displays all tasks assigned to a user.
@param {string} id - User ID
*/
router.get('/user-tasks/:id', ViewsController.renderAllUserTasks);

/**
GET /admin/settings
Renders the admin settings page.
*/
router.get('/admin/settings', async (req, res) => {
    res.render('admin/settings');
});

/**
POST /login
Authenticates user credentials.
Request body:
{
  name: string,
  password: string
}
Redirects on success, or to /wronglogin on failure.
*/
router.post('/login', async (req, res) => {
    const { name, password } = req.body;
    console.log(name, password);
    const userlogin = await UserService.authenticateUser(name, password);
    if (userlogin) {
        res.redirect(userlogin);
    } else {
        res.status(401).redirect('/wronglogin');
    }
});

/**
GET /wronglogin
Displays login failure page.
*/
router.get('/wronglogin', async (req, res) => {
    res.status(404).render('wrong-password');
});

/**
GET /main
Renders the main dashboard/home page after login.
*/
router.get('/main', ViewsController.renderMain);

/**
Fallback for unmatched routes.
Renders a 404 page.
*/
router.use((req, res) => {
    res.status(404).render('404');
});

module.exports = router;
