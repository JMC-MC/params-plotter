const express = require('express');
const viewController = require('../controllers/viewController.js');
const authController = require('../controllers/authController.js');

const router = express.Router();

router.route('/scenario/:id').get(viewController.getScenarioPage);

router
  .route('/admin/login')
  .get(authController.completeLogin, viewController.getAdminOverview);
router
  .route('/admin-overview')
  .get(authController.protected, viewController.getAdminOverview);
router
  .route('/admin-gen')
  .get(authController.protected, viewController.getAdminGenerator);

module.exports = router;
