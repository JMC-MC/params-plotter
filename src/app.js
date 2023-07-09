//THIRD PARTY LIBRARIES
import cloneDeep from 'lodash/cloneDeep';
import { mark, unmark } from 'markjs';
//OWN MODULES
import { initNavigation, resetNavigation } from './navigation.js';
import * as TSSHandler from './utils/tss-handler.js';
import * as NCHandler from './utils/nc-handler.js';
import * as Calculate from './utils/calculators.js';
import * as Draw from './radar/drawPaperElements.js';
import * as RadarControls from './radar/controls.js';
import * as RulesReader from './rulesReader.js';
import * as PprCanvas from './radar/canvas.js';
import { formToScenario } from './utils/form-to-scenario.js';
import { radToDeg } from 'three/src/math/MathUtils.js';
import { buildThreeDRendering, clearScene } from './lookout/threeDisplay.js';
import { startBearingChecker } from './utils/bearing-handler.js';
import { resetControls } from './lookout/controls.js';

//DECLARE VARIABLES

// Original ships, used on reset
let orgShipsAfloat = null;
// Object containing all ships and their properties
let shipsAfloat = null;
let scenarioStart = null;
let TSS = null;
let NC = null;
// Define params object
let params = {
  shipVctrLngth: 6,
  onemile: 0,
  resVis: false,
  play: false,
  scale: 12,
  animatePaperCanvas: null,
};
let scenarioData = '';
// Listener for data
window.addEventListener(
  'message',
  function (event) {
    hideScenario();
    // Convert all number values to number types
    scenarioData = formToScenario(event.data);
    loadData(scenarioData);
  },
  false
);

// BUILD PAGE ELEMENTS
import('paper').then(({ default: paper }) => {
  paper.install(window);
  window.onload = function () {
    initNavigation();
    PprCanvas.init();
    RadarControls.init();
    RulesReader.init();
  };
});

// HANDLE SCENARIO DATA
const loadData = function (scenarioData) {
  if (shipsAfloat) resetScenarioViewer();
  importScenario(scenarioData);
  // Create deep nested clone of shipsAfloat for record of original scenario
  orgShipsAfloat = cloneDeep(shipsAfloat);
  scenarioStart = Date.now();
  buildThreeDRendering();
  startBearingChecker(shipsAfloat);
  revealScenario();
  console.log(shipsAfloat);
};

// Import scenario data
const importScenario = function (data) {
  params.environment = data.env;
  // Find vector from gen centre to screen center
  const screenCenter = new Point(params.centX, params.centY);
  if (!(data.center instanceof Point)) {
    // Only initialize if data.center is not already a Point
    data.center = new Point(data.center[0], data.center[1]);
  }
  const delta = screenCenter.subtract(data.center);
  // Reposition all ships based on screen centre
  data.genShipsAfloat.map((ship) => {
    // Intialise paperjs point
    if (!(ship.position instanceof Point)) {
      ship.position = new Point(ship.position.x, ship.position.y);
    }
    ship.position = ship.position.add(delta);
    // Scale positions
    if (ship.type != 'Own Ship') {
      ship.vecOwnShip = ship.position.subtract(data.genShipsAfloat[0].position);
      ship.vecOwnShip = ship.vecOwnShip.multiply(params.onemile);
      ship.position = screenCenter.add(ship.vecOwnShip);
    }
    // Calculate vec ends
    const vecLength = Calculate.vecLengthInPixels(
      ship.speed,
      params.shipVctrLngth,
      params.onemile
    );
    const endX = Math.cos(ship.course) * vecLength + ship.position.x;
    const endY = Math.sin(ship.course) * vecLength + ship.position.y;
    ship.vecEnd = new Point(endX, endY);
    // Select tgt 001
    if (ship.name == '001') {
      ship.targetSelected = true;
    }
  });
  // TSS
  if (data.TSS) {
    // Initialise paperjs points

    //Centre Positions
    data.TSS.trafficLanes.occupied.position = new Point(
      data.TSS.trafficLanes.occupied.position.x,
      data.TSS.trafficLanes.occupied.position.y
    );
    data.TSS.trafficLanes.other.position = new Point(
      data.TSS.trafficLanes.other.position.x,
      data.TSS.trafficLanes.other.position.y
    );
    data.TSS.sepZone.position = new Point(
      data.TSS.sepZone.position.x,
      data.TSS.sepZone.position.y
    );
    data.TSS.sepZone.position = new Point(
      data.TSS.sepZone.position.x,
      data.TSS.sepZone.position.y
    );
    // Corners
    data.TSS.trafficLanes.occupied.corners.forEach((corner) => {
      corner = new Point(corner.x, corner.y);
    });
    data.TSS.trafficLanes.other.corners.forEach((corner) => {
      corner = new Point(corner.x, corner.y);
    });
    data.TSS.sepZone.corners.forEach((corner) => {
      corner = new Point(corner.x, corner.y);
    });
    // Convert Orientation
    data.TSS.orientation = radToDeg(data.TSS.orientation);

    // Scale dimensions
    data.TSS.trafficLanes.width = data.TSS.trafficLanes.width * params.onemile;
    data.TSS.sepZone.width = data.TSS.sepZone.width * params.onemile;
    data.TSS.length = data.TSS.length * params.onemile;

    // Scale positions
    if (!data.TSS.trafficLanes.occupied.position.equals(data.center)) {
      const vecToCentre = data.TSS.trafficLanes.occupied.position.subtract(
        data.center
      );
      const scalesVecToCentre = vecToCentre.multiply(params.onemile);
      const newPosition = screenCenter.add(scalesVecToCentre);
      // Update positions
      TSSHandler.updatePositionOccupied(newPosition, data.TSS);
    } else TSSHandler.updatePositionOccupied(screenCenter, data.TSS);

    // Add to TSS variable;
    TSS = data.TSS;
    Draw.TSS(TSS);
  }
  if (data.NC) {
    // Initialise paperjs points
    data.NC.lanes.occupied.position = new Point(
      data.NC.lanes.occupied.position.x,
      data.NC.lanes.occupied.position.y
    );
    data.NC.lanes.other.position = new Point(
      data.NC.lanes.other.position.x,
      data.NC.lanes.other.position.y
    );
    data.NC.sepZone.position = new Point(
      data.NC.sepZone.position.x,
      data.NC.sepZone.position.y
    );
    data.NC.markers.portMarkers.forEach((marker) => {
      marker = new Point(marker.x, marker.y);
    });
    data.NC.markers.starboardMarkers.forEach((marker) => {
      marker = new Point(marker.x, marker.y);
    });
    // Corners
    data.NC.lanes.occupied.corners.forEach((corner) => {
      corner = new Point(corner.x, corner.y);
    });
    data.NC.lanes.other.corners.forEach((corner) => {
      corner = new Point(corner.x, corner.y);
    });
    data.NC.sepZone.corners.forEach((corner) => {
      corner = new Point(corner.x, corner.y);
    });
    // Convert Orientation
    data.NC.orientation = radToDeg(data.NC.orientation);

    // Scale dimensions
    data.NC.lanes.width = data.NC.lanes.width * params.onemile;
    data.NC.sepZone.width = data.NC.sepZone.width * params.onemile;
    data.NC.length = data.NC.length * params.onemile;

    // Scale positions of occupied lane
    if (!data.NC.lanes.occupied.position.equals(data.center)) {
      const vecToCentre = data.NC.lanes.occupied.position.subtract(data.center);
      const scalesVecToCentre = vecToCentre.multiply(params.onemile);
      const newPosition = screenCenter.add(scalesVecToCentre);
      // Update positions
      NCHandler.updatePositionOccupied(newPosition, data.NC);
    } else NCHandler.updatePositionOccupied(screenCenter, data.NC);
    data.NC.markers.relPositionsPort = NCHandler.updateMarkerRelPositions(
      data.NC.markers.portMarkers,
      screenCenter,
      params.onemile
    );
    data.NC.markers.relPositionsStarboard = NCHandler.updateMarkerRelPositions(
      data.NC.markers.starboardMarkers,
      screenCenter,
      params.onemile
    );

    // Add to Narrow Channel variable;
    NC = data.NC;
    Draw.narrowChannel(NC, params.onemile, params.centX, params.centY);
  }
  shipsAfloat = data.genShipsAfloat;
  shipsAfloat.forEach((ship) => {
    Draw.ship(ship, params.shipVctrLngth, params.onemile);
  });
};

// Clear scenario data
const resetScenarioViewer = function () {
  // //Reset Scenario Data
  TSS = null;
  NC = null;
  orgShipsAfloat = null;
  shipsAfloat = null;
  scenarioStart = null;
  // Reset params object
  params.shipVctrLngth = 6;
  params.resVis = false;
  params.play = true;
  params.scale = 12;

  //Reset Radar
  PprCanvas.clear();
  PprCanvas.reset();
  RadarControls.updateScaleValue();
  RadarControls.updateVecLengthValue();
  //Reset Lookout
  clearScene();
  resetControls();
  resetNavigation();
};

// Once document is loaded show
function revealScenario() {
  $('.overlay').hide();
}
function hideScenario() {
  $('.overlay').show();
}

export { TSS, NC, params, shipsAfloat };
