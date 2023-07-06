import * as Conv from './converters';
import * as template from './scenarioTemplates';

export function formToScenario(formData) {
  let scenarioData = '';
  // Convert all number values to number data types
  Conv.NumbersInObject(formData);
  // Get Template based on context
  switch (formData.context) {
    case 'NC':
      scenarioData = { ...template.NC };
      break;
    case 'OW':
      scenarioData = { ...template.OW };
      break;
    case 'TSS':
      scenarioData = { ...template.TSS };
  }
  // OwnShip
  scenarioData.genShipsAfloat[0].speed =
    (formData.maxSpeed - formData.minSpeed) / 2;
  scenarioData.genShipsAfloat[0].minSpeed = formData.minSpeed;
  scenarioData.genShipsAfloat[0].maxSpeed = formData.maxSpeed;
  // Add limitations to the ships data
  // Pick a position, course and speed within
  return scenarioData;
}
