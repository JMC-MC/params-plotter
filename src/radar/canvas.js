import * as Draw from './drawPaperElements.js';
import * as TSSHandler from '../utils/tss-handler.js';
import * as NCHandler from '../utils/nc-handler.js';
import * as RadarControls from './controls.js';
import { shipsAfloat, params, TSS, NC } from '../app.js';
import { Point } from 'paper/dist/paper-core';

export function init() {
  let myCanvas = document.getElementById('myCanvas');
  myCanvas.addEventListener(
    'webglcontextlost',
    function (event) {
      event.preventDefault(); // prevent default to allow attempting to restore the context later
      // handle context loss - this could involve deleting and recreating your Paper.js project,
      // or it could involve calling some custom cleanup and restoration code if you have it
      console.log('context lost');
    },
    false
  );

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
    // if ($('#radar').is(':visible')) {
    console.log('resize fired');
    // Update centre position.
    params.centX = myCanvas.getBoundingClientRect().width / 2;
    params.centY = myCanvas.getBoundingClientRect().height / 2;
    // Check if a scenario has been loaded yet
    if (shipsAfloat) {
      Draw.radarRings(project, params.centX, params.centY, params.onemile);
      if (TSS) {
        TSSHandler.updatePositionOccupied(
          TSS.trafficLanes.occupied.position.add(event.delta.divide(2)),
          TSS
        );
        Draw.TSS(TSS);
      }
      if (NC) {
        NCHandler.updatePositionOccupied(
          NC.lanes.occupied.position.add(event.delta.divide(2)),
          NC
        );
        Draw.narrowChannel(NC, params.onemile, params.centX, params.centY);
      }
      for (var i = 0; i < shipsAfloat.length; i++) {
        var ship = shipsAfloat[i];
        ship.position = ship.position.add(event.delta.divide(2));
        ship.vecEnd = ship.vecEnd.add(event.delta.divide(2));
        Draw.ship(ship, params.shipVctrLngth, params.onemile);
      }
    }
    // }
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
        } else if (ship.vecSelected) {
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
  // If canvas is visible
  if ($('#radar').is(':visible')) {
    params.centX = myCanvas.getBoundingClientRect().width / 2;
    params.centY = myCanvas.getBoundingClientRect().height / 2;
    getScale(myCanvas);
    Draw.radarRings(project, params.centX, params.centY, params.onemile);
  }
  // If not visible the above will happen when changing to the radar screen
}

export function reDrawRadar() {
  clear();
  const newCent = new Point(
    myCanvas.getBoundingClientRect().width / 2,
    myCanvas.getBoundingClientRect().height / 2
  );
  const oldCent = new Point(params.centX, params.centY);
  const delta = newCent.subtract(oldCent);
  if (delta.x != 0 || delta.y != 0) {
    project.activeLayer.removeChildren();
    console.log('This is where the problem starts');
    // Update centre position.
    params.centX = newCent.x;
    params.centY = newCent.y;
    // Check if a scenario has been loaded yet
    if (shipsAfloat) {
      console.log('got to draw');
      setTimeout(function () {
        view.update();
      }, 100); // Delay of 100ms

      Draw.radarRings(project, params.centX, params.centY, params.onemile);
      // if (TSS) {
      //   TSSHandler.updatePositionOccupied(
      //     TSS.trafficLanes.occupied.position.add(delta.divide(2)),
      //     TSS
      //   );
      //   Draw.TSS(TSS);
      // }
      // if (NC) {
      //   NCHandler.updatePositionOccupied(
      //     NC.lanes.occupied.position.add(delta.divide(2)),
      //     NC
      //   );
      //   Draw.narrowChannel(NC, params.onemile, params.centX, params.centY);
      // }
      // for (var i = 0; i < shipsAfloat.length; i++) {
      //   var ship = shipsAfloat[i];
      //   ship.position = ship.position.add(delta.divide(2));
      //   ship.vecEnd = ship.vecEnd.add(delta.divide(2));
      //   Draw.ship(ship, params.shipVctrLngth, params.onemile);
      // }
    }
  }
}

// Function to clear the canvas
export function clear() {
  // Remove all items from the project
  project.clear();
}

//Get shortest dimension
function getScale(myCanvas) {
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
