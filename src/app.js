// Import own modules
import { reqData, APIURL } from './requests.js';
// import paper from 'paper';
import cloneDeep from 'lodash/cloneDeep';
import { mark, unmark } from 'markjs';
import './report.js';
import { updateTgtList } from './report.js';
import './navigation.js';
import * as TSSHandler from './tss-handler.js';
import * as NCHandler from './nc-handler.js';
import { radToDeg } from 'three/src/math/MathUtils.js';

// Make the paper scope global, by injecting it into window:
import('paper').then(({ default: paper }) => {
  paper.install(window);
  /////////////////// Things that happen after load ////////////////////////////
  window.onload = function () {
    var myCanvas = document.getElementById('myCanvas');
    // Create an empty project and a view for the canvas:
    paper.setup(myCanvas);
    var tool = new Tool();
    // Parameters
    //Res Vis
    window.resVis = false;
    //Sun Elevation
    window.elevation = '';
    // Animation state
    window.play = true;
    //Scale
    window.scale = 12;
    $('#range-scale, #range-scale-sec').text(scale);
    // Get centre X and Y and declare as global variables
    window.centX = myCanvas.getBoundingClientRect().width / 2;
    window.centY = myCanvas.getBoundingClientRect().height / 2;
    //Get shortest dimension
    function getScale() {
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
      onemile = shortDim / (scale * 2);
    }

    // Adjust range/vectors function
    $('#minus-range, #minus-range-sec').click(function () {
      // Confirm request is within limits
      if (scale > 1.5) {
        // change scale and update number on info panel
        scale = scale / 2;
        $('#range-scale, #range-scale-sec').text(scale);
        // Call function to update canvas
        const direction = 'minus';
        upDateScale(direction);
      }
    });

    $('#plus-range, #plus-range-sec').click(function () {
      // Confirm request is within limits
      if (scale < 48) {
        // change scale and update number on info panel
        scale = scale * 2;
        $('#range-scale, #range-scale-sec').text(scale);
        // Call function to update canvas
        const direction = 'plus';
        upDateScale(direction);
      }
    });

    $('#minus-vec, #minus-vec-sec').click(function () {
      // Confirm request is within limits
      if (ShipVctrLngth > 3) {
        // Call function to update canvas
        const direction = 'minus';
        updateVecLen(direction);
        $('#vec-length, #vec-length-sec').text(ShipVctrLngth);
      }
    });

    $('#plus-vec, #plus-vec-sec').click(function () {
      // Confirm request is within limits
      if (ShipVctrLngth < 48) {
        // Call function to update canvas
        const direction = 'plus';
        updateVecLen(direction);
        $('#vec-length, #vec-length-sec').text(ShipVctrLngth);
      }
    });

    // Accordion info panels
    //Toggle on load
    $('#ship').parent().find('.arrow').toggleClass('arrow-animate');

    $('.title').click(function () {
      // Only for use on medium and large screens
      if ($(window).width() > 601) {
        $(this).parent().find('.arrow').toggleClass('arrow-animate');
        $(this).parent().find('.accordion').slideToggle(280);
      }
    });

    //Config Canvas
    // When browser is resized keep ownship in centre and other ships in same relative position
    view.onResize = function (event) {
      // Update centre position.
      centX = myCanvas.getBoundingClientRect().width / 2;
      centY = myCanvas.getBoundingClientRect().height / 2;
      drawRR();
      if (TSS) {
        TSSHandler.updatePositionOccupied(
          TSS.trafficLanes.occupied.position.add(event.delta.divide(2)),
          TSS
        );
        drawTSS(TSS);
      }
      if (NC) {
        NCHandler.updatePositionOccupied(
          NC.lanes.occupied.position.add(event.delta.divide(2)),
          NC
        );
        drawNC(NC);
      }
      for (var i = 0; i < shipsAfloat.length; i++) {
        var ship = shipsAfloat[i];
        ship.position = ship.position.add(event.delta.divide(2));
        ship.vecEnd = ship.vecEnd.add(event.delta.divide(2));
        drawShip(ship);
      }
    };

    //Adjust ships with mouse events
    tool.onMouseDown = function (event) {
      console.log(event.point);
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
            clearTargetSelected();
            ship.targetSelected = true;
            $('#ship').css('background-color', 'grey');
          }
          if (!($('#ctrl-bar').css('display') == 'none')) {
            // Indicate edit functions
            clearEditSelected();
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
        drawShip(ship);
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
          calcCPA(ship, shipsAfloat[0]);
          drawShip(ship);
        }
      }
    };

    tool.onMouseUp = function () {
      clearSelectedShip();
      clearEditSelected();
      for (var i = 0; i < shipsAfloat.length; i++) {
        var ship = shipsAfloat[i];
        drawShip(ship);
      }
      $('#ship').css('background-color', 'white');
    };

    // Once all element are loaded draw range rings on radar
    getScale();
    drawRR();

    // Load Scenario
    checkData();

    // Record bearings every 0.5 secs. Stop recoding after 10 bearings
    setInterval(function () {
      if (shipsAfloat[1].bearings.length < 10) {
        for (var i = 1; i < shipsAfloat.length; i++) {
          var ship = shipsAfloat[i];
          ship.bearings.push(ship.OwnShipAngle);
        }
      }
    }, 500);

    // Create deep nested clone of shipsAfloat for record of original scenario
    orgShipsAfloat = cloneDeep(shipsAfloat);
    updateTgtList();

    // Change form if in restricted visibility mode
    if (window.resVis) {
      $('#type-vis').hide();
      $('#type-resvis').show();
    } else {
      $('#type-vis').show();
      $('#type-resvis').hide();
    }

    scenarioStart = Date.now();
    revealScenario();
    import('./3dmodv2.js').then((res) => {
      res.buildThreeDRendering();
    });
  };
});

//Set Ships Vector Length in Mins
var ShipVctrLngth = 6;
// Declare Default scenario settings
var onemile;

// Array for ships on canvas
// Original ships, used on reset
let orgShipsAfloat = [];
// ships that are updated when moved.
window.shipsAfloat = [];
// Start time
let scenarioStart = '';
// TSS
let TSS = '';
// NC
let NC = '';

// Display scale
function upDateScale(direction) {
  //Move ships on screen to reflect new scale
  // If reducing range scale
  if (direction == 'minus') {
    onemile += onemile;

    drawRR();
    if (TSS) {
      TSSHandler.updateScale(TSS, shipsAfloat, direction);
      drawTSS(TSS);
    }
    if (NC) {
      NCHandler.updateScale(NC, shipsAfloat, direction);
      drawNC(NC);
    }

    // Loop through every ship
    for (var i = 0; i < shipsAfloat.length; i++) {
      var ship = shipsAfloat[i];
      if (ship.type != 'Own Ship') {
        // Get vector to ownShip/centre
        const vecOwnShip = ship.position.subtract(shipsAfloat[0].position);
        ship.position = ship.position.add(vecOwnShip);
        ship.vecEnd = ship.vecEnd.add(vecOwnShip);
        ship.vecEnd = ship.vecEnd.add(ship.vector);
      }
      if (ship.type == 'Own Ship') {
        // Increase vector size by 2
        ship.vecEnd = ship.vecEnd.add(ship.vector);
      }
      calcCPA(ship, shipsAfloat[0]);
      drawShip(ship);
    }
  } else {
    onemile = onemile / 2;
    drawRR();
    if (TSS) {
      TSSHandler.updateScale(TSS, shipsAfloat, direction);
      drawTSS(TSS);
    }
    if (NC) {
      NCHandler.updateScale(NC, shipsAfloat, direction);
      drawNC(NC);
    }
    // Loop through every ship
    for (var i = 0; i < shipsAfloat.length; i++) {
      var ship = shipsAfloat[i];
      if (ship.type != 'Own Ship') {
        // Get vector to ownShip/centre
        const vecOwnShip = ship.position.subtract(shipsAfloat[0].position);
        ship.position = ship.position.subtract(vecOwnShip.divide(2));
        ship.vecEnd = ship.vecEnd.subtract(vecOwnShip.divide(2));
        ship.vecEnd = ship.vecEnd.subtract(ship.vector.divide(2));
      }
      if (ship.type == 'Own Ship') {
        // Half vector size.
        ship.vecEnd = ship.vecEnd.subtract(ship.vector.divide(2));
      }
      calcCPA(ship, shipsAfloat[0]);
      drawShip(ship);
    }
  }
}

// Vector settings
// Vector Length
function updateVecLen(direction) {
  if (direction == 'minus') {
    ShipVctrLngth = ShipVctrLngth - ShipVctrLngth / 2;
    // Loop through every ship
    for (var i = 0; i < shipsAfloat.length; i++) {
      var ship = shipsAfloat[i];
      // Adjust Vec End
      ship.vecEnd = ship.vecEnd.subtract(ship.vector.divide(2));
      calcCPA(ship, shipsAfloat[0]);
      drawShip(ship);
    }
  } else {
    ShipVctrLngth = ShipVctrLngth + ShipVctrLngth;
    // Loop through every ship
    for (var i = 0; i < shipsAfloat.length; i++) {
      var ship = shipsAfloat[i];
      // Adjust Vec End
      ship.vecEnd = ship.vecEnd.add(ship.vector);
      calcCPA(ship, shipsAfloat[0]);
      drawShip(ship);
    }
  }
}

// Functions for Ships
// Move shipsAfloat and features
const updateShips = function (delta) {
  const deltaSecs = delta / 1000;
  if (play == true) {
    drawRR();
    // Update TSS
    if (TSS) {
      const OSvecInSec = shipsAfloat[0].vector.length * 60;
      const factor = deltaSecs / OSvecInSec;
      let moveVector = shipsAfloat[0].vector.multiply(factor);
      moveVector.angle = shipsAfloat[0].vector.angle - 180;
      const newPosition = TSS.trafficLanes.occupied.position.add(moveVector);
      TSSHandler.updatePositionOccupied(newPosition, TSS);
      drawTSS(TSS);
    }
    // Update Narrow Channel
    if (NC) {
      const OSvecInSec = shipsAfloat[0].vector.length * 60;
      const factor = deltaSecs / OSvecInSec;
      let moveVector = shipsAfloat[0].vector.multiply(factor);
      moveVector.angle = shipsAfloat[0].vector.angle - 180;
      const newPosition = NC.lanes.occupied.position.add(moveVector);
      NCHandler.updatePositionOccupied(newPosition, NC);
      drawNC(NC);
    }
    drawShip(shipsAfloat[0]);
    for (var i = 0; i < shipsAfloat.length; i++) {
      var ship = shipsAfloat[i];
      if (ship.type != 'Own Ship') {
        // ship.relVec describes the velocity over ShipVctrLength (time)
        // Find the fractions of event.delta/ShipVctrLngth and reduce the rel vec by this factor.
        // ShipVctrLngth in secs
        let SvecInSec = ShipVctrLngth * 60;
        let factor = deltaSecs / SvecInSec;
        let moveVector = ship.relVec.multiply(factor);
        ship.position = ship.position.add(moveVector);
        ship.vecEnd = ship.vecEnd.add(moveVector);
        // Update rel position
        ship.vecOwnShip = ship.position.subtract(shipsAfloat[0].position);
        ship.OwnShipAngle = ship.vecOwnShip.angle;
        ship.relposXnm = pixelsToMiles(ship.vecOwnShip.x);
        ship.relposYnm = pixelsToMiles(ship.vecOwnShip.y);
        // Update USNRel
        ship.USNRel = updateUSNR(ship, shipsAfloat[0]);
        ship.USNRelFrmOwnShp = updateUSNRFrmOwnshp(ship, shipsAfloat[0]);
        calcCPA(ship, shipsAfloat[0]);
        if ($('#radar').is(':visible')) drawShip(ship);
      }
    }
  }
};
const checkData = function () {
  if (window.importedScenario) {
    importScenario(window.importedScenario);
  } else {
    // Data is not loaded yet, schedule next check
    console.log("Didn't load");
    window.requestAnimationFrame(checkData);
  }
};

// Import and process generated Scenario
const importScenario = function (data) {
  elevation = 1; // TODO: Get elevation from data
  resVis = data.resVis;
  // Find vector from gen centre to screen center
  const screenCenter = new Point(centX, centY);
  // Intialise paperjs point
  data.center = new Point(data.center[0], data.center[1]);
  const delta = screenCenter.subtract(data.center);
  // Reposition all ships based on screen centre
  data.genShipsAfloat.map((ship) => {
    // Intialise paperjs point
    ship.position = new Point(ship.position.x, ship.position.y);
    ship.position = ship.position.add(delta);
    // Scale positions
    if (ship.type != 'Own Ship') {
      ship.vecOwnShip = ship.position.subtract(data.genShipsAfloat[0].position);
      ship.vecOwnShip = ship.vecOwnShip.multiply(onemile);
      ship.position = screenCenter.add(ship.vecOwnShip);
    }
    // Calculate vec ends
    const vecLength = calcvecLength(ship.speed);
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
    data.TSS.trafficLanes.width = data.TSS.trafficLanes.width * onemile;
    data.TSS.sepZone.width = data.TSS.sepZone.width * onemile;
    data.TSS.length = data.TSS.length * onemile;

    // Scale positions
    if (!data.TSS.trafficLanes.occupied.position.equals(data.center)) {
      const vecToCentre = data.TSS.trafficLanes.occupied.position.subtract(
        data.center
      );
      const scalesVecToCentre = vecToCentre.multiply(onemile);
      const newPosition = screenCenter.add(scalesVecToCentre);
      // Update positions
      TSSHandler.updatePositionOccupied(newPosition, data.TSS);
    } else TSSHandler.updatePositionOccupied(screenCenter, data.TSS);

    // Add to TSS variable;
    TSS = data.TSS;
    drawTSS(TSS);
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
    data.NC.lanes.width = data.NC.lanes.width * onemile;
    data.NC.sepZone.width = data.NC.sepZone.width * onemile;
    data.NC.length = data.NC.length * onemile;

    // Scale positions of occupied lane
    if (!data.NC.lanes.occupied.position.equals(data.center)) {
      const vecToCentre = data.NC.lanes.occupied.position.subtract(data.center);
      const scalesVecToCentre = vecToCentre.multiply(onemile);
      const newPosition = screenCenter.add(scalesVecToCentre);
      // Update positions
      NCHandler.updatePositionOccupied(newPosition, data.NC);
    } else NCHandler.updatePositionOccupied(screenCenter, data.NC);

    // Add to Narrow Channel variable;
    NC = data.NC;
    console.log(NC);
    drawNC(NC);
  }
  shipsAfloat = data.genShipsAfloat;
  shipsAfloat.forEach((ship) => {
    drawShip(ship);
  });
};
// Functions for calculating speeds and distances
function pixelsToMiles(pixels) {
  const distanceInMiles = pixels / onemile;
  return distanceInMiles;
}

function MilesTopixels(miles) {
  const pixelsInMiles = Math.round(miles * onemile * 100) / 100;
  return pixelsInMiles;
}

function calcSpeed(vecLength) {
  const distanceInMiles = pixelsToMiles(vecLength);
  const speed = distanceInMiles * (60 / ShipVctrLngth);
  const roundedSpeed = Math.round(speed * 100) / 100;
  return roundedSpeed;
}

function calcvecLength(speed) {
  const miles = (speed / 60) * ShipVctrLngth;
  const distanceInPixels = MilesTopixels(miles);
  return distanceInPixels;
}

// Calculate CPA from own ship
function calcCPA(ship, ownship) {
  // Is this a target ship?
  if (ship.type == 'Own Ship') return;
  else {
    var p3 = ship.position;
    var p4 = ship.vecEnd;
  }
  var p1 = ownship.position;
  var p2 = ownship.vecEnd;
  var Xa = (p2.x - p1.x) / ShipVctrLngth;
  var Ya = (p2.y - p1.y) / ShipVctrLngth;
  var Xb = (p4.x - p3.x) / ShipVctrLngth;
  var Yb = (p4.y - p3.y) / ShipVctrLngth;
  // TCPA
  const tcpa =
    (-(p1.y * Ya) +
      p3.y * Ya -
      Xb * p3.x -
      Xa * p1.x -
      Yb * p3.y +
      Xb * p1.x +
      Xa * p3.x +
      Yb * p1.y) /
    (Math.pow(Xb, 2) +
      Math.pow(Xa, 2) +
      Math.pow(Ya, 2) +
      Math.pow(Yb, 2) -
      2 * Xb * Xa -
      2 * Yb * Ya);
  // Assign to ship
  ship.tcpa = Math.round(tcpa * 10) / 10;
  // Declare more variables for distance formula
  var XaT = tcpa * ((p2.x - p1.x) / ShipVctrLngth) + p1.x;
  var YaT = tcpa * ((p2.y - p1.y) / ShipVctrLngth) + p1.y;
  var XbT = tcpa * ((p4.x - p3.x) / ShipVctrLngth) + p3.x;
  var YbT = tcpa * ((p4.y - p3.y) / ShipVctrLngth) + p3.y;
  //Position of target at CPA
  ship.posAtCPA = new Point([XbT, YbT]);
  ship.ownPosAtCPA = new Point([XaT, YaT]);
  ship.vecToCPA = ship.ownPosAtCPA.subtract(ship.posAtCPA);
  ship.USNRelAtCPA = USNRel(
    convertAngle(ship.vecToCPA.angle),
    convertAngle(ownship.vector.angle)
  );

  //Formula for calculating distance between two ships at tcpa
  const distance = Math.sqrt(Math.pow(XbT - XaT, 2) + Math.pow(YbT - YaT, 2));
  ship.cpaMiles = pixelsToMiles(distance);
  //Assign to ship
  ship.cpa = distance;
}

// Convert Vector angles to compass bearing
const convertAngle = function (angle) {
  if (angle >= -90 && angle <= 180) return (angle += 90);
  else return (angle += 450);
};

function addoos(bearing) {
  var BrngAsString;
  // Add 0s when required
  if (bearing >= 100) return bearing;
  else if (bearing > 9) {
    BrngAsString = '0' + bearing;
    return BrngAsString;
  } else {
    BrngAsString = '00' + bearing;
    return BrngAsString;
  }
}

// Draw elements
function drawShip(ship) {
  ship.vector = ship.vecEnd.subtract(ship.position);
  ship.arrowVector = ship.vector.normalize(10);
  // Clear previous elements
  if (ship.vectorItem) {
    ship.vectorItem.remove();
  }
  if (ship.data) {
    ship.data.remove();
  }
  if (ship.relVecItem) {
    ship.relVecItem.remove();
  }
  if (ship.targetIndicator) {
    ship.targetIndicator.remove();
  }
  if (ship.editIndicator) {
    ship.editIndicator.remove();
  }

  // Draw elements for target
  if (ship.type != 'Own Ship') {
    // Calculate range & bearing
    const vecOwnShip = ship.position.subtract(shipsAfloat[0].position);
    ship.range = pixelsToMiles(Math.round(vecOwnShip.length));
    ship.bearing = addoos(convertAngle(Math.round(vecOwnShip.angle)));
    const textAngle =
      Math.abs(vecOwnShip.angle) > 90
        ? 180 + vecOwnShip.angle
        : vecOwnShip.angle;
    // Calculate a movement relative to ownShip
    ship.relVec = ship.vector.subtract(shipsAfloat[0].vector);
    ship.relVecEnd = ship.position.add(ship.relVec);
    // Make dimensions for arrow elements
    ship.relArrowVector = ship.relVec.normalize(10);
    // Ship information
    ship.relVecItem = new Group([
      new Path({
        segments: [[ship.position], [ship.relVecEnd]],
      }),
    ]);
    var limX = myCanvas.width / 2;
    var limY = myCanvas.height / 2;
    // Place tgt info
    if (ship.vector.angle < 0 && ship.vector.angle > -180)
      ship.labelPos = [ship.position.x - 10, ship.position.y + 20];
    else ship.labelPos = [ship.position.x - 10, ship.position.y - 10];

    if (ship.targetSelected & !ship.editSelected) {
      // If in edit mode, display arrows instead of box
      if (!($('#ctrl-bar').css('display') == 'none')) {
        ship.targetIndicator = new Group([
          new Path([
            ship.position.subtract([0, 20]),
            ship.position.subtract([0, 40]),
          ]),
          new Path.RegularPolygon(
            new Point(ship.position.subtract([0, 40])),
            3,
            5
          ),
          new Path([ship.position.add([0, 20]), ship.position.add([0, 40])]),
          new Path.RegularPolygon(
            new Point(ship.position.add([0, 40])),
            3,
            5
          ).rotate(180),
          new Path([ship.position.add([20, 0]), ship.position.add([40, 0])]),
          new Path.RegularPolygon(
            new Point(ship.position.add([40, 1])),
            3,
            5
          ).rotate(90),
          new Path([
            ship.position.subtract([20, 0]),
            ship.position.subtract([40, 0]),
          ]),
          new Path.RegularPolygon(
            new Point(ship.position.subtract([40, 0]).add([0, 1])),
            3,
            5
          ).rotate(270),
          new Path([
            ship.vecEnd.subtract([0, 10]),
            ship.vecEnd.subtract([0, 20]),
          ]),
          new Path.RegularPolygon(
            new Point(ship.vecEnd.subtract([0, 20])),
            3,
            5
          ),
          new Path([ship.vecEnd.add([0, 10]), ship.vecEnd.add([0, 20])]),
          new Path.RegularPolygon(
            new Point(ship.vecEnd.add([0, 20])),
            3,
            5
          ).rotate(180),
          new Path([ship.vecEnd.add([10, 0]), ship.vecEnd.add([20, 0])]),
          new Path.RegularPolygon(
            new Point(ship.vecEnd.add([20, 1])),
            3,
            5
          ).rotate(90),
          new Path([
            ship.vecEnd.subtract([10, 0]),
            ship.vecEnd.subtract([20, 0]),
          ]),
          new Path.RegularPolygon(
            new Point(ship.vecEnd.subtract([20, 0]).add([0, 1])),
            3,
            5
          ).rotate(270),
        ]);
      } else {
        const leftTopCorner = ship.position.subtract([30, 30]);
        const leftBottomCorner = ship.position.subtract([30, 0]).add([0, 30]);
        const rightTopCorner = ship.position.add([30, 0]).subtract([0, 30]);
        const rightBottomCorner = ship.position.add([30, 30]);
        ship.targetIndicator = new Group([
          new Path([
            leftTopCorner.subtract([1, 0]),
            leftTopCorner.add([10, 0]),
          ]),
          new Path([leftTopCorner, leftTopCorner.add([0, 10])]),
          new Path([
            leftBottomCorner.subtract([1, 0]),
            leftBottomCorner.add([10, 0]),
          ]),
          new Path([leftBottomCorner, leftBottomCorner.subtract([0, 10])]),
          new Path([
            rightTopCorner.add([1, 0]),
            rightTopCorner.subtract([10, 0]),
          ]),
          new Path([rightTopCorner, rightTopCorner.add([0, 10])]),
          new Path([
            rightBottomCorner.add([1, 0]),
            rightBottomCorner.subtract([10, 0]),
          ]),
          new Path([rightBottomCorner, rightBottomCorner.subtract([0, 10])]),
        ]);
      }
      ship.targetIndicator.strokeWidth = 1;
      ship.targetIndicator.strokeColor = 'white';
      $(document).ready(function () {
        $('#tgt-name').text('TARGET ' + ship.name);
        $('#ship-cog').text(
          addoos(convertAngle(Math.round(ship.vector.angle)))
        );
        $('#ship-sog').text(calcSpeed(ship.vector.length).toFixed(1));
        $('#ship-brg').text(ship.bearing);
        $('#ship-rng, #ship-rng-sec').text(ship.range.toFixed(1));
        if (ship.cpa != NaN) {
          $('#ship-cpa, #ship-cpa-sec').text(
            pixelsToMiles(ship.cpa).toFixed(1)
          );
        } else {
          $('#ship-cpa, #ship-cpa-sec').text(ship.range).toFixed(1);
        }
        if (ship.tcpa) {
          $('#ship-tcpa, #ship-tcpa-sec').text(ship.tcpa.toFixed(1));
        }
      });
    }

    ship.data = new Group([
      new PointText({
        point: ship.labelPos,
        content: ship.name, //+ ' (' + ship.type + ')',
        fillColor: 'white',
        justification: 'left',
        fontSize: 10,
      }),
    ]);
    ship.relVecItem.strokeColor = 'grey';
    ship.relVecItem.strokeWidth = 1;
    ship.relVecItem.children[0].dashArray = [3, 2];
  }
  ship.vectorItem = new Group([
    new Path.Circle(ship.position, 6),
    new Path.Circle({ center: ship.position, radius: 3, fillColor: 'white' }),
    new Path({
      segments: [[ship.position], [ship.vecEnd]],
    }),
  ]);
  if (ship.editSelected) {
    ship.editIndicator = new Group([
      new Path([
        ship.position.subtract([0, 20]),
        ship.position.subtract([0, 40]),
      ]),
      new Path.RegularPolygon(new Point(ship.position.subtract([0, 40])), 3, 5),
      new Path([ship.position.add([0, 20]), ship.position.add([0, 40])]),
      new Path.RegularPolygon(
        new Point(ship.position.add([0, 40])),
        3,
        5
      ).rotate(180),
      new Path([ship.position.add([20, 0]), ship.position.add([40, 0])]),
      new Path.RegularPolygon(
        new Point(ship.position.add([40, 1])),
        3,
        5
      ).rotate(90),
      new Path([
        ship.position.subtract([20, 0]),
        ship.position.subtract([40, 0]),
      ]),
      new Path.RegularPolygon(
        new Point(ship.position.subtract([40, 0]).add([0, 1])),
        3,
        5
      ).rotate(270),
    ]);
    ship.editIndicator.strokeWidth = 1;
    ship.editIndicator.strokeColor = '#bf1a49';
    ship.editIndicator.fillColor = '#bf1a49';
  }
  if (ship.vecSelected) {
    ship.editIndicator = new Group([
      new Path([ship.vecEnd.subtract([0, 10]), ship.vecEnd.subtract([0, 20])]),
      new Path.RegularPolygon(new Point(ship.vecEnd.subtract([0, 20])), 3, 5),
      new Path([ship.vecEnd.add([0, 10]), ship.vecEnd.add([0, 20])]),
      new Path.RegularPolygon(new Point(ship.vecEnd.add([0, 20])), 3, 5).rotate(
        180
      ),
      new Path([ship.vecEnd.add([10, 0]), ship.vecEnd.add([20, 0])]),
      new Path.RegularPolygon(new Point(ship.vecEnd.add([20, 1])), 3, 5).rotate(
        90
      ),
      new Path([ship.vecEnd.subtract([10, 0]), ship.vecEnd.subtract([20, 0])]),
      new Path.RegularPolygon(
        new Point(ship.vecEnd.subtract([20, 0]).add([0, 1])),
        3,
        5
      ).rotate(270),
    ]);
    ship.editIndicator.strokeWidth = 1;
    ship.editIndicator.strokeColor = '#bf1a49';
    ship.editIndicator.fillColor = '#bf1a49';
  }

  //Style
  ship.vectorItem.strokeWidth = 1;
  if (ship.type == 'Own Ship') {
    ship.containerPos = [ship.position.x - 35, ship.position.y - 20];
    ship.vectorItem.strokeColor = '#1a9cbf';
    ship.vectorItem.children[1].fillColor = '#1a9cbf';
    $(document).ready(function () {
      $('#ownship-cog').text(
        addoos(convertAngle(Math.round(shipsAfloat[0].vector.angle)))
      );
      $('#ownship-sog').text(
        calcSpeed(shipsAfloat[0].vector.length).toFixed(1)
      );
      $('#height').text(myCanvas.height);
      $('#width').text(myCanvas.width);
    });
  } else ship.vectorItem.strokeColor = 'white';
}

// Draw Range Rings
function drawRR() {
  project.activeLayer.removeChildren();
  const rrScale = 3;
  const centre = [centX, centY];
  const rangeRings = new Group([
    new Path.Circle(centre, onemile * rrScale),
    new Path.Circle(centre, onemile * (rrScale * 2)),
    new Path.Circle(centre, onemile * (rrScale * 3)),
    new Path.Circle(centre, onemile * (rrScale * 4)),
    new Path.Circle(centre, onemile * (rrScale * 5)),
    new Path.Circle(centre, onemile * (rrScale * 6)),
    new Path.Circle(centre, onemile * (rrScale * 7)),
    new Path.Circle(centre, onemile * (rrScale * 8)),
    new Path.Circle(centre, onemile * (rrScale * 9)),
    new Path.Circle(centre, onemile * (rrScale * 10)),
    new Path.Circle(centre, onemile * (rrScale * 11)),
    new Path.Circle(centre, onemile * (rrScale * 12)),
    new Path.Circle(centre, onemile * (rrScale * 13)),
    new Path.Circle(centre, onemile * (rrScale * 14)),
  ]);
  rangeRings.strokeWidth = 1;
  rangeRings.strokeColor = '#282828';
}

function drawTSS(TSS) {
  // if (TSS.paths) TSS.paths.remove();

  TSS.paths = new Group();

  const occupiedTrafficLaneBoundary = new Path.Line({
    from: TSS.trafficLanes.occupied.corners[0],
    to: TSS.trafficLanes.occupied.corners[1],
  });

  const otherTrafficLaneBoundary = new Path.Line({
    from: TSS.trafficLanes.other.corners[2],
    to: TSS.trafficLanes.other.corners[3],
  });

  const sepZonePath = new Path({
    segments: TSS.sepZone.corners,
    closed: true,
    fillColor: '#bf1a80',
    opacity: 0.75,
  });

  TSS.paths.addChildren([
    occupiedTrafficLaneBoundary,
    otherTrafficLaneBoundary,
    sepZonePath,
  ]);

  // Set the dash pattern, stroke color, and stroke width for the traffic lanes outer boundaries
  occupiedTrafficLaneBoundary.strokeWidth = 1;
  occupiedTrafficLaneBoundary.dashArray = [10, 5];
  occupiedTrafficLaneBoundary.strokeColor = '#bf1a80';

  otherTrafficLaneBoundary.strokeWidth = 1;
  otherTrafficLaneBoundary.dashArray = [10, 5];
  otherTrafficLaneBoundary.strokeColor = '#bf1a80';
}
function drawNC(NC) {
  NC.paths = new Group();

  // const occupiedLaneBoundary = new Path.Line({
  //   from: NC.lanes.occupied.corners[0],
  //   to: NC.lanes.occupied.corners[1],
  // });

  // const otherLaneBoundary = new Path.Line({
  //   from: NC.lanes.other.corners[2],
  //   to: NC.lanes.other.corners[3],
  // });

  // const sepZonePath = new Path({
  //   segments: NC.sepZone.corners,
  //   closed: true,
  //   fillColor: 'red',
  //   opacity: 0.75,
  // });

  let channelMarkers = new Group();

  const markerSize = onemile / 4;

  const maxWidth = 3; // maximum width
  const maxHeight = 5; // maximum height

  NC.markers.portMarkers.forEach((marker) => {
    const vecToCent = new Point(centX, centY).subtract(marker);
    const distance = pixelsToMiles(vecToCent.length);
    const factor = markerSize * Math.exp(-distance);
    // Calculate width and height, ensure they don't exceed the maximum
    const width = Math.min(factor * 10, maxWidth);
    const height = Math.min(factor * 3, maxHeight);

    const rectSize = new Size(width, height);
    const topLeft = marker.subtract([rectSize.width / 2, rectSize.height / 2]);
    let newMarker = new Path.Rectangle(topLeft, rectSize);
    newMarker.rotate(vecToCent.angle + 90);
    newMarker.fillColor = '#FAC728';
    channelMarkers.addChild(newMarker);
  });

  NC.markers.starboardMarkers.forEach((marker) => {
    const vecToCent = new Point(centX, centY).subtract(marker);
    const distance = pixelsToMiles(vecToCent.length);
    const factor = markerSize * Math.exp(-distance);
    // Calculate width and height, ensure they don't exceed the maximum
    const width = Math.min(factor * 10, maxWidth);
    const height = Math.min(factor * 3, maxHeight);

    const rectSize = new Size(width, height);
    const topLeft = marker.subtract([rectSize.width / 2, rectSize.height / 2]);
    let newMarker = new Path.Rectangle(topLeft, rectSize);
    newMarker.rotate(vecToCent.angle + 90);
    newMarker.fillColor = '#FAC728';
    channelMarkers.addChild(newMarker);
  });

  NC.paths.addChildren([
    // occupiedLaneBoundary,
    // otherLaneBoundary,
    // sepZonePath,
    channelMarkers,
  ]);

  // Set the dash pattern, stroke color, and stroke width for the traffic lanes outer boundaries
  // occupiedLaneBoundary.strokeColor = 'yellow';
  // occupiedLaneBoundary.strokeWidth = 1;
  // occupiedLaneBoundary.opacity = 0.75;
  // otherLaneBoundary.strokeColor = 'green';
  // otherLaneBoundary.strokeWidth = 1;
  // otherLaneBoundary.opacity = 0.75;
}

//Clear selected in all ships
function clearSelectedShip() {
  for (var i = 0; i < shipsAfloat.length; i++) {
    shipsAfloat[i].posSelected = false;
    shipsAfloat[i].vecSelected = false;
  }
}

//Clear target selected in all ships
function clearTargetSelected() {
  for (var i = 0; i < shipsAfloat.length; i++) {
    shipsAfloat[i].targetSelected = false;
  }
}

//Clear edit selected in all ships
function clearEditSelected() {
  for (var i = 0; i < shipsAfloat.length; i++) {
    shipsAfloat[i].editSelected = false;
  }
}

// Animate Ships and update relative positions for 3D render

// Once document is loaded show
function revealScenario() {
  $('.overlay').hide();
}

// Search for rules

$(document).ready(function () {
  $(function () {
    // the input field
    var $input = $("input[type='search']"),
      // clear button
      $clearBtn = $("button[data-search='clear']"),
      // prev button
      $prevBtn = $("button[data-search='prev']"),
      // next button
      $nextBtn = $("button[data-search='next']"),
      // the context where to search
      $content = $('.rules-text'),
      // jQuery object to save <mark> elements
      $results,
      // the class that will be appended to the current
      // focused element
      currentClass = 'current',
      // top offset for the jump (the search bar)
      offsetTop = 500,
      // the current index of the focused element
      currentIndex = 0;

    /**
     * Jumps to the element matching the currentIndex
     */
    function jumpTo() {
      if ($results.length) {
        var position,
          $current = $results.eq(currentIndex);
        $results.removeClass(currentClass);
        if ($current.length) {
          $current.addClass(currentClass);
          position = $current.offset().top - offsetTop;
          window.scrollTo(0, position);
        }
      }
    }

    /**
     * Searches for the entered keyword in the
     * specified context on input
     */
    $input.on('input', function () {
      var searchVal = this.value;
      $content.unmark({
        done: function () {
          $content.mark(searchVal, {
            separateWordSearch: true,
            done: function () {
              $results = $content.find('mark');
              currentIndex = 0;
              jumpTo();
            },
          });
        },
      });
    });

    /**
     * Clears the search
     */
    $clearBtn.on('click', function () {
      $content.unmark();
      $input.val('').focus();
    });

    /**
     * Next and previous search jump to
     */
    $prevBtn.on('click', function () {
      if ($results.length) {
        currentIndex += $(this).is($prevBtn) ? -1 : 1;
        if (currentIndex < 0) {
          currentIndex = $results.length - 1;
        }
        if (currentIndex > $results.length - 1) {
          currentIndex = 0;
        }
        jumpTo();
      }
    });
    $nextBtn.on('click', function () {
      if ($results.length) {
        currentIndex += $(this).is($prevBtn) ? -1 : 1;
        if (currentIndex < 0) {
          currentIndex = $results.length - 1;
        }
        if (currentIndex > $results.length - 1) {
          currentIndex = 0;
        }
        jumpTo();
      }
    });
  });
});

// Find reciprocal bearing
function recip(bearing) {
  if (bearing > 180) return bearing - 180;
  else return bearing + 180;
}

//Calculate USN relative

function USNRel(bearing, course) {
  const x = recip(bearing) - course;
  if (x < 0) return x + 360;
  else return x;
}

function updateUSNR(ship, ownship) {
  const vecOwnShip = ship.position.subtract(ownship.position);
  return USNRel(
    convertAngle(vecOwnShip.angle),
    convertAngle(ship.vector.angle)
  );
}

function updateUSNRFrmOwnshp(ship, ownship) {
  const vecOwnShip = ownship.position.subtract(ship.position);
  return USNRel(
    convertAngle(vecOwnShip.angle),
    convertAngle(ownship.vector.angle)
  );
}

export { calcvecLength, calcCPA, drawShip, updateShips, convertAngle };
