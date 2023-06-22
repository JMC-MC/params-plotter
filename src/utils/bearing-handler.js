import { shipsAfloat } from '../app';
import * as Convert from './converters';
import { parameters } from '../lookout/threeDisplay';

// Record bearings every 0.5 secs. Stop recoding after 10 bearings
export function startBearingChecker(shipsAfloat) {
  setInterval(function () {
    if (shipsAfloat[1].bearings.length < 10) {
      for (var i = 1; i < shipsAfloat.length; i++) {
        var ship = shipsAfloat[i];
        ship.bearings.push(ship.OwnShipAngle);
      }
    }
  }, 500);
}

// Bearing Logger
let currentTime = '';
export function bearingLogger(clickedCompass) {
  // Only log when using compass
  const timeAtLastClick = currentTime;
  currentTime = Date.now();
  // Time since last rotation click
  const dwellTime = currentTime - timeAtLastClick;

  // Check if bearing has been taken
  shipsAfloat.slice(1).forEach((ship) => {
    // Get absolute difference between currentBearing and ship bearing
    const bearingDiff = Math.abs(
      Convert.vecAngleToCompassBrng(Math.round(ship.vecOwnShip.angle)) -
        parameters.currentBearing
    );
    if (dwellTime > 1000 && bearingDiff < 3) {
      -console.log(
        `bearingDiff = ${bearingDiff} | dwellTime = ${dwellTime} |  actualBearing = ${ship.bearing}`
      );
      ship.bearingsTaken.push(timeAtLastClick);
    }
    // Change to compass view already on the right bearing "clickedCompass"
    // Ignore dwellTime
    if (clickedCompass && bearingDiff < 4) {
      ship.bearingsTaken.push(currentTime);
    }
  });
}
