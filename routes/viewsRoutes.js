// routes/viewRoutes.js
const express = require('express');
const router = express.Router();

const projectService = require('../services/projectService');
const ClientService = require('../services/clientService');
const serviceService = require('../services/serviceService');

const ViewsController = require('../controllers/viewsController');

const pages = ['/', '/projects', '/clients', '/services', '/sacredbranding', '/login'];

pages.forEach((page) => {
    router.get(page, ViewsController.renderPage);
});

router.get('/user/:id', ViewsController.getUserPage);
router.get('/user/:id/project/:projectId', ViewsController.renderUserProject);
router.get('/user/:id/project/:projectId/task', ViewsController.renderUserTask);

router.get('/admin/settings', async (req, res) => {
    res.render('admin/settings');
});

router.get('/main', async (req, res) => {
    const services = await serviceService.readServices();
    res.render('main', { services });
});

module.exports = router;
