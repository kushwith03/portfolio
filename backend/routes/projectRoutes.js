const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

router.get('/', projectController.getProjects);
router.post('/admin', projectController.createProject); // Basic admin route
router.delete('/admin/:id', projectController.deleteProject); // Basic admin route

module.exports = router;