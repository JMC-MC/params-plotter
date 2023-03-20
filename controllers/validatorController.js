const { body, validationResult } = require('express-validator');

exports.scenarioValidationRules = () => {
  var chars =
    'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789&://';
  return [
    body('scenarioObject').isJSON(),
    body('staffAnswer').isLength({ min: 5 }).whitelist(chars),
    body('tags').whitelist(chars),
  ];
};

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};
