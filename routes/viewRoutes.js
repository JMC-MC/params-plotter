const express = require('express');
const viewController = require('../controllers/viewController.js');
const authController = require('../controllers/authController.js');

const router = express.Router();
router.route('/scenario').get(viewController.getScenarioPage);

module.exports = router;
