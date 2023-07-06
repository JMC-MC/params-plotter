import * as Draw from './drawPaperElements.js';
import * as TSSHandler from '../utils/tss-handler.js';
import * as NCHandler from '../utils/nc-handler.js';
import * as RadarControls from './controls.js';
import * as Calculate from '../utils/calculators.js';
import { shipsAfloat, params, TSS, NC } from '../app.js';
import { Point } from 'paper/dist/paper-core';

export function init() {
  let myCanvas = document.getElementById('myCanvas');
  // Create an empty project and a view for the canvas:
  paper.setup(myCanvas);
  let tool = new Tool();
  params.centX = myCanvas.getBoundingClientRect().width / 2;
  params.centY = myCanvas.getBoundingClientRect().height / 2;
  console.log(params.centX);
  getScale(myCanvas);
  //Config Canvas
  // When browser is resized keep ownship in centre and other ships in same relative position
  view.onResize = function (event) {
    params.centX = myCanvas.getBoundingClientRect().width / 2;
    params.centY = myCanvas.getBoundingClientRect().height / 2;
    // Check if a scenario has been loaded yet
    if (shipsAfloat) {
      if (TSS) {
        TSSHandler.updatePositionOccupied(
          TSS.trafficLanes.occupied.position.add(event.delta.divide(2)),
          TSS
        );
      }
      if (NC) {
        NCHandler.updatePositionOccupied(
          NC.lanes.occupied.position.add(event.delta.divide(2)),
          NC
        );
      }
      for (var i = 0; i < shipsAfloat.length; i++) {
        var ship = shipsAfloat[i];
        ship.position = ship.position.add(event.delta.divide(2));
        ship.vecEnd = ship.vecEnd.add(event.delta.divide(2));
      }
      // Draw all elements

      Draw.radarRings(project, params.centX, params.centY, params.onemile);
      if (TSS) Draw.TSS(TSS);
      if (NC)
        Draw.narrowChannel(NC, params.onemile, params.centX, params.centY);
      Draw.ship(shipsAfloat[0], params.shipVctrLngth, params.onemile);
      for (var i = 1; i < shipsAfloat.length; i++) {
        var ship = shipsAfloat[i];
        Draw.ship(ship, params.shipVctrLngth, params.onemile);
      }
    }
  };

  //Adjust ships with mouse events
  tool.onMouseDown = function (event) {
    //Check to see which element user clicked on.
    //Get ship position and vector end point
    for (var i = 0; i < shipsAfloat.length; i++) {
      var ship = shipsAfloat[i];
      var position = ship.position;
      var vectorEnd = ship.vecEnd;
      var infoBox = ship.containerPos;
      // Was ship position clicked ?
      if (position && position.getDistance(event.point) < 10) {
        ship.posSelected = true;
        if (ship.type != 'Own Ship') {
          // Only count select if targetSelected was false before mouse down.
          if (ship.targetSelected == false) ship.selectCount += 1;
          RadarControls.clearTargetSelected();
          ship.targetSelected = true;
          $('#ship').css('background-color', 'grey');
        }
        if (!($('#ctrl-bar').css('display') == 'none')) {
          // Indicate edit functions
          RadarControls.clearEditSelected();
          ship.editSelected = true;
        }
        break;
      }
      //Was ship vector end clicked?
      else if (
        vectorEnd &&
        vectorEnd.getDistance(event.point) < 10 &&
        !($('#ctrl-bar').css('display') == 'none')
      ) {
        ship.vecSelected = true;
        break;
      }
    }
    for (var i = 0; i < shipsAfloat.length; i++) {
      var ship = shipsAfloat[i];
      Draw.ship(ship, params.shipVctrLngth, params.onemile);
    }
  };

  tool.onMouseDrag = function (event) {
    // Only move ships and vectors if in edit mode
    if (!($('#ctrl-bar').css('display') == 'none')) {
      for (var i = 0; i < shipsAfloat.length; i++) {
        var ship = shipsAfloat[i];
        if (ship.posSelected & (ship.type != 'Own Ship')) {
          ship.position = ship.position.add(event.delta);
          ship.vecEnd = ship.vecEnd.add(event.delta);
        } else if (ship.vecSelected && speedCheck(ship)) {
          ship.vecEnd = ship.vecEnd.add(event.delta);
        }
        Calculate.CPA(
          ship,
          shipsAfloat[0],
          params.shipVctrLngth,
          params.onemile
        );
        Draw.ship(ship, params.shipVctrLngth, params.onemile);
      }
    }
  };

  tool.onMouseUp = function () {
    RadarControls.clearSelectedShip();
    RadarControls.clearEditSelected();
    for (var i = 0; i < shipsAfloat.length; i++) {
      var ship = shipsAfloat[i];
      Draw.ship(ship, params.shipVctrLngth, params.onemile);
    }
    $('#ship').css('background-color', 'white');
  };
  // Once all element are loaded draw range rings on radar
  Draw.radarRings(project, params.centX, params.centY, params.onemile);
}

export function reset() {
  // Reset onemile value
  getScale();
}

// Function to clear the canvas
export function clear() {
  // Remove all items from the project
  project.clear();
}

//Get shortest dimension
export function getScale() {
  if (
    myCanvas.getBoundingClientRect().height <
    myCanvas.getBoundingClientRect().width
  ) {
    var shortDim = myCanvas.getBoundingClientRect().height;
  } else {
    var shortDim = myCanvas.getBoundingClientRect().width;
  }
  // Set shortest dim at 24nm
  // This creates a 12nm range scale
  params.onemile = shortDim / (params.scale * 2);
}

function speedCheck(ship) {
  if (ship.speed < ship.maxSpeed && ship.speed > ship.minSpeed) {
    return true;
  } else return false;
}
