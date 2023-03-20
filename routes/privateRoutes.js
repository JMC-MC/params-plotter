const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');

router.route('/*').get(authController.protected, express.static('private'));

module.exports = router;
