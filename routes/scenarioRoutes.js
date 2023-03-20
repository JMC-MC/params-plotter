const express = require('express');
const scenarioController = require('../controllers/scenarioController');
const authController = require('../controllers/authController.js');
const validatorController = require('../controllers/validatorController.js');

const router = express.Router();
router
  .route('/')
  .post(authController.protected, scenarioController.createScenarioRecord);

router.route('/:id').get(scenarioController.getScenarioRecord);
router.route('/:id').patch(scenarioController.updateScenarioRecord);
module.exports = router;
