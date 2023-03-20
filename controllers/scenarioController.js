const Scenario = require('../models/scenarioModel');

exports.getScenarioRecord = async (req, res) => {
  try {
    const scenario = await Scenario.getById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: { scenario },
    });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err });
  }
};

exports.createScenarioRecord = async (req, res) => {
  try {
    const newScenario = await Scenario.create(req.body);
    res.status(200).json({
      status: 'success',
      data: newScenario,
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err });
  }
};

exports.updateScenarioRecord = async (req, res) => {
  try {
    const scenario = await Scenario.getByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: { scenario },
    });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err });
  }
};
