// Import own modules
import { reqData, APIURL } from './requests.js';
import cloneDeep from 'lodash/cloneDeep';
import { mark, unmark } from 'markjs';
import './navigation.js';
import * as TSSHandler from './tss-handler.js';
import * as NCHandler from './nc-handler.js';
import * as Convert from './utils/converters.js';
import * as Calculate from './utils/calculators.js';
import * as Draw from './drawPaperElements.js';
import { radToDeg } from 'three/src/math/MathUtils.js';
import * as RadarControls from './radar/controls.js';

// Listener for data
window.addEventListener(
  'message',
  function (event) {
    console.log(event.data);
    // Do something with event.data, which contains the message sent from the parent
    window.importedScenario = event.data;
  },
  false
);

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
    params.resVis = false;
    params.elevation = null;
    params.play = true;
    params.scale = 12;
    params.centX = myCanvas.getBoundingClientRect().width / 2;
    params.centY = myCanvas.getBoundingClientRect().height / 2;

    RadarControls.init();

    $('#range-scale, #range-scale-sec').text(params.scale);

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
      params.onemile = shortDim / (params.scale * 2);
    }

    // Adjust range/vectors function
    $('#minus-range, #minus-range-sec').click(function () {
      // Confirm request is within limits
      if (params.scale > 1.5) {
        // change scale and update number on info panel
        params.scale = params.scale / 2;
        $('#range-scale, #range-scale-sec').text(params.scale);
        // Call function to update canvas
        const direction = 'minus';
        upDateScale(direction);
      }
    });

    $('#plus-range, #plus-range-sec').click(function () {
      // Confirm request is within limits
      if (params.scale < 48) {
        // change scale and update number on info panel
        params.scale = params.scale * 2;
        $('#range-scale, #range-scale-sec').text(params.scale);
        // Call function to update canvas
        const direction = 'plus';
        upDateScale(direction);
      }
    });

    $('#minus-vec, #minus-vec-sec').click(function () {
      // Confirm request is within limits
      if (params.shipVctrLngth > 3) {
        // Call function to update canvas
        const direction = 'minus';
        updateVecLen(direction);
        $('#vec-length, #vec-length-sec').text(params.shipVctrLngth);
      }
    });

    $('#plus-vec, #plus-vec-sec').click(function () {
      // Confirm request is within limits
      if (params.shipVctrLngth < 48) {
        // Call function to update canvas
        const direction = 'plus';
        updateVecLen(direction);
        $('#vec-length, #vec-length-sec').text(params.shipVctrLngth);
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
      console.log('paper JS resizing');
      // Update centre position.
      params.centX = myCanvas.getBoundingClientRect().width / 2;
      params.centY = myCanvas.getBoundingClientRect().height / 2;
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
        Draw.narrowChannel(NC, params.onemile);
      }
      for (var i = 0; i < shipsAfloat.length; i++) {
        var ship = shipsAfloat[i];
        ship.position = ship.position.add(event.delta.divide(2));
        ship.vecEnd = ship.vecEnd.add(event.delta.divide(2));
        Draw.ship(ship, params.shipVctrLngth, params.onemile);
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
      clearSelectedShip();
      clearEditSelected();
      for (var i = 0; i < shipsAfloat.length; i++) {
        var ship = shipsAfloat[i];
        Draw.ship(ship, params.shipVctrLngth, params.onemile);
      }
      $('#ship').css('background-color', 'white');
    };

    // Once all element are loaded draw range rings on radar
    getScale();
    Draw.radarRings(project, params.centX, params.centY, params.onemile);

    // Load Scenario
    checkData();

    // Create deep nested clone of shipsAfloat for record of original scenario
    orgShipsAfloat = cloneDeep(shipsAfloat);
    updateTgtList();

    // Change form if in restricted visibility mode
    if (params.resVis) {
      $('#type-vis').hide();
      $('#type-resvis').show();
    } else {
      $('#type-vis').show();
      $('#type-resvis').hide();
    }
  };
});
let params = {
  shipVctrLngth: 6,
  onemile: 0,
};

// Array for ships on canvas
// Original ships, used on reset
let orgShipsAfloat = [];
// ships that are updated when moved.
window.shipsAfloat = [];
// Start time
let scenarioStart = '';
// TSS
let TSS = null;
// NC
let NC = null;

// Display scale
function upDateScale(direction) {
  //Move ships on screen to reflect new scale
  // If reducing range scale
  if (direction == 'minus') {
    params.onemile += params.onemile;

    Draw.radarRings(project, params.centX, params.centY, params.onemile);
    if (TSS) {
      TSSHandler.updateScale(TSS, shipsAfloat, direction);
      Draw.TSS(TSS);
    }
    if (NC) {
      NCHandler.updateScale(
        NC,
        shipsAfloat,
        direction,
        new Point(params.centX, params.centY),
        params.onemile
      );
      Draw.narrowChannel(NC, params.onemile);
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
      Calculate.CPA(ship, shipsAfloat[0], params.shipVctrLngth, params.onemile);
      Draw.ship(ship, params.shipVctrLngth, params.onemile);
    }
  } else {
    params.onemile = params.onemile / 2;
    Draw.radarRings(project, params.centX, params.centY, params.onemile);
    if (TSS) {
      TSSHandler.updateScale(TSS, shipsAfloat, direction);
      Draw.TSS(TSS);
    }
    if (NC) {
      NCHandler.updateScale(
        NC,
        shipsAfloat,
        direction,
        new Point(params.centX, params.centY),
        params.onemile
      );
      Draw.narrowChannel(NC, params.onemile);
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
      Calculate.CPA(ship, shipsAfloat[0], params.shipVctrLngth, params.onemile);
      Draw.ship(ship, params.shipVctrLngth, params.onemile);
    }
  }
}

// Vector settings
// Vector Length
function updateVecLen(direction) {
  if (direction == 'minus') {
    params.shipVctrLngth = params.shipVctrLngth - params.shipVctrLngth / 2;
    // Loop through every ship
    for (var i = 0; i < shipsAfloat.length; i++) {
      var ship = shipsAfloat[i];
      // Adjust Vec End
      ship.vecEnd = ship.vecEnd.subtract(ship.vector.divide(2));
      Calculate.CPA(ship, shipsAfloat[0], params.shipVctrLngth, params.onemile);
      Draw.ship(ship, params.shipVctrLngth, params.onemile);
    }
  } else {
    params.shipVctrLngth = params.shipVctrLngth + params.shipVctrLngth;
    // Loop through every ship
    for (var i = 0; i < shipsAfloat.length; i++) {
      var ship = shipsAfloat[i];
      // Adjust Vec End
      ship.vecEnd = ship.vecEnd.add(ship.vector);
      Calculate.CPA(ship, shipsAfloat[0], params.shipVctrLngth, params.onemile);
      Draw.ship(ship, params.shipVctrLngth, params.onemile);
    }
  }
}

// Functions for Ships
// Move shipsAfloat and features
const updateShips = function (delta) {
  const deltaSecs = delta / 1000;
  if (params.play == true) {
    Draw.radarRings(project, params.centX, params.centY, params.onemile);
    // Update TSS
    if (TSS) {
      const OSvecInSec = shipsAfloat[0].vector.length * 60;
      const factor = deltaSecs / OSvecInSec;
      let moveVector = shipsAfloat[0].vector.multiply(factor);
      moveVector.angle = shipsAfloat[0].vector.angle - 180;
      const newPosition = TSS.trafficLanes.occupied.position.add(moveVector);
      TSSHandler.updatePositionOccupied(newPosition, TSS);
      Draw.TSS(TSS);
    }
    // Update Narrow Channel
    if (NC) {
      const OSvecInSec = shipsAfloat[0].vector.length * 60;
      const factor = deltaSecs / OSvecInSec;
      let moveVector = shipsAfloat[0].vector.multiply(factor);
      moveVector.angle = shipsAfloat[0].vector.angle - 180;
      const newPosition = NC.lanes.occupied.position.add(moveVector);
      NCHandler.updatePositionOccupied(newPosition, NC);
      NC.markers.relPositionsPort = NCHandler.updateMarkerRelPositions(
        NC.markers.portMarkers,
        shipsAfloat[0].position,
        params.onemile
      );
      NC.markers.relPositionsStarboard = NCHandler.updateMarkerRelPositions(
        NC.markers.starboardMarkers,
        shipsAfloat[0].position,
        params.onemile
      );
      Draw.narrowChannel(NC, params.onemile);
    }
    Draw.ship(shipsAfloat[0], params.shipVctrLngth, params.onemile);
    for (var i = 0; i < shipsAfloat.length; i++) {
      var ship = shipsAfloat[i];
      if (ship.type != 'Own Ship') {
        // ship.relVec describes the velocity over ShipVctrLength (time)
        // Find the fractions of event.delta/params.shipVctrLngth and reduce the rel vec by this factor.
        // params.shipVctrLngth in secs
        let SvecInSec = params.shipVctrLngth * 60;
        let factor = deltaSecs / SvecInSec;
        let moveVector = ship.relVec.multiply(factor);
        ship.position = ship.position.add(moveVector);
        ship.vecEnd = ship.vecEnd.add(moveVector);
        // Update rel position
        ship.vecOwnShip = ship.position.subtract(shipsAfloat[0].position);
        ship.OwnShipAngle = ship.vecOwnShip.angle;
        ship.relposXnm = Convert.pixelsToMiles(
          ship.vecOwnShip.x,
          params.onemile
        );
        ship.relposYnm = Convert.pixelsToMiles(
          ship.vecOwnShip.y,
          params.onemile
        );
        // Update USNRel
        ship.USNRel = updateUSNR(ship, shipsAfloat[0]);
        ship.USNRelFrmOwnShp = updateUSNRFrmOwnshp(ship, shipsAfloat[0]);
        Calculate.CPA(
          ship,
          shipsAfloat[0],
          params.shipVctrLngth,
          params.onemile
        );
        if ($('#radar').is(':visible'))
          Draw.ship(ship, params.shipVctrLngth, params.onemile);
      }
    }
  }
};
const checkData = function () {
  if (window.importedScenario) {
    console.log(window.importedScenario);
    importScenario(window.importedScenario);
    scenarioStart = Date.now();
    revealScenario();
    import('./3dmodv2.js').then((res) => {
      res.buildThreeDRendering();
    });
    startBearingChecker();
  } else {
    // Data is not loaded yet, schedule next check
    window.requestAnimationFrame(checkData);
  }
};

// Import and process generated Scenario
const importScenario = function (data) {
  setupEnvironment(data);
  params.elevation = -10; // TODO: Get elevation from data
  params.resVis = data.resVis;
  // Find vector from gen centre to screen center
  const screenCenter = new Point(params.centX, params.centY);
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
    Draw.narrowChannel(NC, params.onemile);
  }
  shipsAfloat = data.genShipsAfloat;
  shipsAfloat.forEach((ship) => {
    Draw.ship(ship, params.shipVctrLngth, params.onemile);
  });
};

// Record bearings every 0.5 secs. Stop recoding after 10 bearings
function startBearingChecker() {
  setInterval(function () {
    if (shipsAfloat[1].bearings.length < 10) {
      for (var i = 1; i < shipsAfloat.length; i++) {
        var ship = shipsAfloat[i];
        ship.bearings.push(ship.OwnShipAngle);
      }
    }
  }, 500);
}

function setupEnvironment() {}

// function drawTSS(TSS) {

//   TSS.paths = new Group();

//   const occupiedTrafficLaneBoundary = new Path.Line({
//     from: TSS.trafficLanes.occupied.corners[0],
//     to: TSS.trafficLanes.occupied.corners[1],
//   });

//   const otherTrafficLaneBoundary = new Path.Line({
//     from: TSS.trafficLanes.other.corners[2],
//     to: TSS.trafficLanes.other.corners[3],
//   });

//   const sepZonePath = new Path({
//     segments: TSS.sepZone.corners,
//     closed: true,
//     fillColor: '#bf1a80',
//     opacity: 0.75,
//   });

//   TSS.paths.addChildren([
//     occupiedTrafficLaneBoundary,
//     otherTrafficLaneBoundary,
//     sepZonePath,
//   ]);

//   // Set the dash pattern, stroke color, and stroke width for the traffic lanes outer boundaries
//   occupiedTrafficLaneBoundary.strokeWidth = 1;
//   occupiedTrafficLaneBoundary.dashArray = [10, 5];
//   occupiedTrafficLaneBoundary.strokeColor = '#bf1a80';

//   otherTrafficLaneBoundary.strokeWidth = 1;
//   otherTrafficLaneBoundary.dashArray = [10, 5];
//   otherTrafficLaneBoundary.strokeColor = '#bf1a80';
// }

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

function updateUSNR(ship, ownship) {
  const vecOwnShip = ship.position.subtract(ownship.position);
  return Calculate.USNRel(
    Convert.vecAngleToCompassBrng(vecOwnShip.angle),
    Convert.vecAngleToCompassBrng(ship.vector.angle)
  );
}

function updateUSNRFrmOwnshp(ship, ownship) {
  const vecOwnShip = ownship.position.subtract(ship.position);
  return Calculate.USNRel(
    Convert.vecAngleToCompassBrng(vecOwnShip.angle),
    Convert.vecAngleToCompassBrng(ownship.vector.angle)
  );
}

export { updateShips, NC, params };
