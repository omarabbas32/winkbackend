const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

// Route to get all services
router.get('/', serviceController.getAllServices);

// Route to get a single service by ID
router.get('/:id', serviceController.getServiceById);

module.exports = router;