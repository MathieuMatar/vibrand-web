// routes/viewRoutes.js
const express = require('express');
const router = express.Router();

const projectService = require('../services/projectService');
const ClientService = require('../services/clientService');
const serviceService = require('../services/serviceService');
const UserService = require('../services/userService');

const ViewsController = require('../controllers/viewsController');

const pages = ['/', '/projects', '/clients', '/services', '/sacredbranding', '/login'];

pages.forEach((page) => {
    router.get(page, ViewsController.renderPage);
});

router.get('/user/:id', ViewsController.getUserPage);
router.get('/user/:id/project/:projectId', ViewsController.renderUserProject);
router.get('/user/:id/project/:projectId/task', ViewsController.renderUserTask);
router.get('/task/new/:user/:project', ViewsController.renderNewTask);
router.get('/task/:id/:user/:project', ViewsController.renderSingleTask);
router.get('/project-info/:id', ViewsController.renderProjectInfo);
router.get('/user-tasks/:id', ViewsController.renderAllUserTasks);
router.get('/admin/settings', async (req, res) => {
    res.render('admin/settings');
});





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

router.get('/wronglogin', async (req, res) => {
    res.status(404).render('wrong-password');
});
    


router.get('/main', ViewsController.renderMain);


router.use((req, res) => {
    res.status(404).render('404');
});

module.exports = router;
