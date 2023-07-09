import * as Conv from './converters';
import * as Calc from './calculators';
import * as template from './scenarioTemplates';
import cloneDeep from 'lodash/cloneDeep';
const { fromAngle, add, create } = require('./vector2D');

export function formToScenario(formData) {
  let scenarioData = '';
  // Convert all number values to number data types
  Conv.NumbersInObject(formData);
  // Get Template based on context
  switch (formData.context) {
    case 'NC':
      scenarioData = cloneDeep(template.NC);
      break;
    case 'OW':
      scenarioData = cloneDeep(template.OW);
      break;
    case 'TSS':
      scenarioData = cloneDeep(template.TSS);
  }
  // OwnShip //
  scenarioData.genShipsAfloat[0].speed =
    (formData.maxSpeed - formData.minSpeed) / 2 + formData.minSpeed;
  scenarioData.genShipsAfloat[0].speedLims = {
    min: formData.minSpeed,
    max: formData.maxSpeed,
  };
  // Reposition Ship params to the center of all limitations
  // Range
  scenarioData.genShipsAfloat[1].range =
    (formData.range.max - formData.range.min) / 2 + formData.range.min;
  // AFOSH
  scenarioData.genShipsAfloat[1].AFOSH =
    (formData.AFOSH.max - formData.AFOSH.min) / 2 + formData.AFOSH.min;
  const bearingRads =
    scenarioData.genShipsAfloat[0].course +
    Conv.degToRad(scenarioData.genShipsAfloat[1].AFOSH);
  // Generate target position
  const relativePositionVector = fromAngle(
    bearingRads,
    scenarioData.genShipsAfloat[1].range
  );
  scenarioData.genShipsAfloat[1].position = add(
    scenarioData.genShipsAfloat[0].position,
    relativePositionVector
  );
  // Generate target course
  const AFTSHRads = Conv.degToRad(
    (formData.AFTSH.max - formData.AFTSH.min) / 2 + formData.AFTSH.min
  );

  // Calculate course using angle from target ship's head
  scenarioData.genShipsAfloat[1].course = Calc.targetCourse(
    bearingRads,
    AFTSHRads
  );

  // Target Limitations //

  scenarioData.genShipsAfloat[1].rangeLims = { ...formData.range };
  scenarioData.genShipsAfloat[1].speedLims = formData.vessels.speedLims;
  scenarioData.genShipsAfloat[1].AFOSH = { ...formData.AFOSH };
  scenarioData.genShipsAfloat[1].AFTSH = { ...formData.AFTSH };

  return scenarioData;
}
