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
    // Generate Scenario
    const scenario = await View.generateScenario();
    // Process Data
    let rules = [];
    let htmlList = '';
    scenario.genShipsAfloat.forEach((ship) => {
      if ('rules' in ship && ship.rules.length > 0) {
        rules = rules.concat(ship.rules);
      }
    });
    rules.forEach((element) => {
      htmlList += `<li><a class="rule-link" at="${element}">Rule ${element}</a></li>`;
    });
    // Return data in render
    res.status(200).render('index', {
      scenarioObject: scenario,
      importScenNonce: importScenNonce,
      staffAnswer: scenario.staff_answer,
      htmlList: htmlList,
    });
  } catch (error) {
    res.status(404).send('Page not found');
    console.log(error);
  }
};
