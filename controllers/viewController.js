const axios = require('axios');
const View = require('../models/viewModel');
const { completeLogin } = require('../controllers/authController');
const { importScenNonce } = require('../middleware/nonce');

const {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
} = require('@aws-sdk/client-cognito-identity-provider');

exports.getScenarioPage = async (req, res) => {
  try {
    // Get data
    const scenario = await View.getById(req.params.id);
    const extractedArray = scenario.scenario_object;
    // Process Data
    let rules = [];
    let htmlList = '';
    extractedArray.genShipsAfloat.forEach((ship) => {
      if ('rules' in ship && ship.rules.length > 0) {
        rules = rules.concat(ship.rules);
      }
    });
    rules.forEach((element) => {
      htmlList += `<li><a class="rule-link" at="${element}">Rule ${element}</a></li>`;
    });
    // Return data in render
    res.status(200).render('index', {
      scenarioObject: extractedArray,
      importScenNonce: importScenNonce,
      staffAnswer: scenario.staff_answer,
      htmlList: htmlList,
    });
  } catch (error) {
    res.status(404).send('Page not found');
  }
};

exports.getAdminOverview = async (req, res) => {
  try {
    // Get data
    const data = await View.getAll();
    // Return data in render
    res.status(200).render('admin-overview', {
      data: data,
    });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err });
  }
};

exports.getAdminGenerator = async (req, res) => {
  try {
    // Return page in render
    res.status(200).render('admin-gen');
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err });
  }
};
