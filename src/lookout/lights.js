import { scene } from './threeDisplay';
import { shipsAfloat } from '../app.js';

// Functions to controls lights on models.

export function shipSwitch(dark) {
  // All lights are visible by default
  // Turn off all lights if dark is false
  if (!dark) {
    scene.traverse((obj) => {
      if (obj.name.includes('light')) {
        obj.visible = false;
      }
    });
  }
}

export function flash(buoy) {
  if (!buoy.lastSwitch) startFlashing(buoy); // Start flashing sequence at different times
  const timeSinceSwitch = Date.now() - buoy.lastSwitch;
  // If light is on and time since last switch is greater than flash length turn it off
  if (buoy.lightOn && timeSinceSwitch > buoy.flashLength) {
    buoy.traverse((obj) => {
      if (obj.name.includes('light')) {
        obj.visible = false;
      }
      buoy.lightOn = false;
      buoy.lastSwitch = Date.now();
    });
    // If light is off and time since last switch is greater than flash interval length turn it on
  } else if (!buoy.lightOn && timeSinceSwitch > buoy.flashInterval) {
    buoy.traverse((obj) => {
      if (obj.name.includes('light')) {
        obj.visible = true;
      }
      buoy.lightOn = true;
      buoy.lastSwitch = Date.now();
    });
  }
}

function startFlashing(buoy) {
  const randomTimeDelta = Math.random() * buoy.flashLength;
  buoy.lastSwitch = Date.now() - randomTimeDelta;
}

// Turn directional lights on/off depending on angle
export function simDirection(indexNo, shipObject) {
  const shipUSN = shipsAfloat[indexNo].USNRel;
  shipObject.traverse((el) => {
    // Starboard side light
    if (
      el.name.includes('SG') &&
      ((shipUSN > 0 && shipUSN < 112.5) || (shipUSN > 354 && shipUSN < 360))
    )
      el.visible = true;
    if (el.name.includes('SG') && shipUSN > 112.5 && shipUSN < 354)
      el.visible = false;
    // Port side light
    if (
      el.name.includes('SR') &&
      ((shipUSN > 247.5 && shipUSN < 360) || (shipUSN > 0 && shipUSN < 4))
    )
      el.visible = true;
    if (el.name.includes('SR') && shipUSN > 4 && shipUSN < 247.5)
      el.visible = false;
    // Mast Head light
    if (
      el.name.includes('MH') &&
      ((shipUSN > 247.5 && shipUSN < 360) || (shipUSN > 0 && shipUSN < 112.5))
    )
      el.visible = true;
    if (el.name.includes('MH') && shipUSN > 112.5 && shipUSN < 247.5)
      el.visible = false;
    // Stern light
    if (el.name.includes('STRN') && shipUSN > 112.5 && shipUSN < 247.5)
      el.visible = true;
    if (el.name.includes('STRN') && shipUSN > 0 && shipUSN < 112.5)
      el.visible = false;
    if (el.name.includes('STRN') && shipUSN > 247.5 && shipUSN < 360)
      el.visible = false;
  });
}
