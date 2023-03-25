// Import own modules
import { reqData, APIURL } from './requests.js';
// import paper from 'paper';
import cloneDeep from 'lodash/cloneDeep';
import { mark, unmark } from 'markjs';
import './report.js';
import { updateTgtList } from './report.js';
import './navigation.js';

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

    // Setting menu

    // New Scenario
    $('#newScn, #newScn_sec').click(function () {
      // Clear canvas
      project.activeLayer.removeChildren();
      shipsAfloat = [];
      // Generate new ships
      genOwnShip();
      genScenario(noCols, noTgts, cpaThres, tcpaThres);
    });
    // Edit mode
    // Edit mode on
    $('#edit, #edit_sec').click(function () {
      // On click make border red
      $('#display-area').css('border-color', '#bf1a49');
      $('#ctrl-bar').removeClass('w3-hide');
    });
    // Edit mode off
    $('#exit').click(function () {
      // On click make border red
      $('#display-area').css('border-color', '#606060');
      $('#ctrl-bar').addClass('w3-hide');
    });

    // Range
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
      for (var i = 0; i < shipsAfloat.length; i++) {
        var ship = shipsAfloat[i];
        ship.position = ship.position.add(event.delta.divide(2));
        ship.vecEnd = ship.vecEnd.add(event.delta.divide(2));
        drawShip(ship);
      }
      // Change orgShipAfloat positions to match new canvas size.
      // These positions are edited seperately so that the user can interact with the ship then resize the screen
      // then recover the org scenario but with the new canvas size.
      for (var i = 0; i < orgShipsAfloat.length; i++) {
        var ship = orgShipsAfloat[i];
        ship.position = ship.position.add(event.delta.divide(2));
        ship.vecEnd = ship.vecEnd.add(event.delta.divide(2));
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

    // Once all element are loaded draw RR
    getScale();
    drawRR();

    // Deal with Url data
    if (urlParams.has('data')) {
      urlData = JSON.parse(window.atob(urlParams.get('data')));
    }
    // Generate Scenario

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

    // Create deep nested clone of shipsAfloat that scenario can be reset to.
    orgShipsAfloat = cloneDeep(shipsAfloat);
    updateTgtList();

    ////////// Populate debrief card //////////

    // Change form for resVis
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
//////////////////// Things that can happen before load ///////////////////

//Set Ships Vector Length in Mins
var ShipVctrLngth = 6;
// Declare Default scenario settings
var onemile;
var noTgts;
var noCols;
var cpaThres;
var tcpaThres;

// Array for ships on canvas
// Original ships, used on reset
window.orgShipsAfloat = [];
// ships that are updated when moved.
window.shipsAfloat = [];
// Global var for start time
window.scenarioStart = '';

// Vessel types in scenario
var tgtTypes = ['PDV', 'SV', 'VEIF', 'NUC', 'RAM'];

// Get URL Parms
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const urlScen = urlParams.get('scenario');
let urlData = [];

// Create variable for scenario ID

var scenarioId = '';
var question = '';

// Functions for display settings
// Display scale

function upDateScale(direction) {
  //Move ships on screen to reflect new scale
  // If reducing range scale
  if (direction == 'minus') {
    onemile += onemile;
    drawRR();
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
//TODO: Check accuracy and performance of the animation code.
// Move shipsAfloat
const updateShips = function (delta) {
  const deltaSecs = delta / 1000;
  if (play == true) {
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

// Import and process generated Scenario into one that will display on radar
const importScenario = function (data) {
  elevation = data.elevation;
  resVis = data.resVis;
  // Find vector from gen centre to screen center
  const screenCenter = new Point(centX, centY);
  // Intialise paperjs point
  data.center = new Point(data.center[1], data.center[2]);
  const delta = screenCenter.subtract(data.center);
  // Reposition all ships based on screen centre
  data.genShipsAfloat.map((ship) => {
    // Convert all arrays with first value 'point' to paperjs Points
    // Object.keys(ship).map((val) => {
    //   if (typeof ship.val === 'Array' && ship.val[0] === 'Point') {
    //     console.log(val);
    //   }
    // });
    // Intialise paperjs point
    ship.position = new Point(ship.position[1], ship.position[2]);
    ship.position = ship.position.add(delta);
    // Scale positions
    if (ship.type != 'Own Ship') {
      // Intialise paperjs for  point
      ship.vecOwnShip = new Point(ship.vecOwnShip[1], ship.vecOwnShip[2]);
      ship.vecOwnShip = ship.vecOwnShip.multiply(onemile);
      ship.position = screenCenter.add(ship.vecOwnShip);
    }
    // Calculate vec ends
    const vecLength = calcvecLength(ship.speed);
    const endX = Math.cos(ship.course) * vecLength + ship.position.x;
    const endY = Math.sin(ship.course) * vecLength + ship.position.y;
    ship.vecEnd = new Point(endX, endY);
  });
  console.log(data);
  shipsAfloat = data.genShipsAfloat;
  shipsAfloat.forEach((ship) => {
    drawShip(ship);
  });
};

// Functions for picking random numbers
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.random() * (max - 1 - min + 1) + min;
}
//Return whole number
function getRandomArbitrary(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Functions for calculating speeds and distance
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

// Create own ship
function OwnShip(positionX, positionY, vecEndX, vecEndY, course, speed, type) {
  this.position = new Point(positionX, positionY);
  this.vecEnd = new Point(vecEndX, vecEndY);
  this.type = type;
  this.vector = this.position.subtract(this.vecEnd);
  this.posSelected = false;
  this.vecSelected = false;
  this.course = course;
  this.speed = speed;
  shipsAfloat.push(this);
}

// Create ship
function Ship(
  positionX,
  positionY,
  vecEndX,
  vecEndY,
  name,
  type,
  course,
  rules,
  speed,
  toBeReported,
  typeSound
) {
  this.position = new Point(positionX, positionY);
  this.vecEnd = new Point(vecEndX, vecEndY);
  this.vector = this.position.subtract(this.vecEnd);
  this.speed = speed;
  this.course = course;
  this.type = type;
  this.typeSound = typeSound;
  this.posSelected = false;
  this.vecSelected = false;
  this.targetSelected = false;
  this.editSelected = false;
  this.vecOwnShip = this.position.subtract(shipsAfloat[0].position);
  this.OwnShipAngle = this.vecOwnShip.angle;
  this.relposXnm = pixelsToMiles(this.vecOwnShip.x);
  this.relposYnm = pixelsToMiles(this.vecOwnShip.y);
  this.range = pixelsToMiles(this.vecOwnShip.length);
  this.name = name;
  this.cpa;
  this.tcpa;
  this.rules = rules;
  this.bearings = [];
  this.bearingsTaken = [];
  this.selectCount = 0;
  this.toBeReported = toBeReported;
}

function randSampleNoRtrn(list) {
  var randomIndex = Math.floor(Math.random() * list.length);
  return list.splice(randomIndex, 1)[0];
}

function createTgts(numberTgts) {
  for (var i = 0; i < numberTgts; i++) {
    var type = 'N/A';
    var speed = randomIntFromInterval(2.0, 28.0);
    var vecLength = calcvecLength(speed);
    var posX = randomIntFromInterval(10, myCanvas.width / 2 - 10);
    var posY = randomIntFromInterval(10, myCanvas.height / 2 - 10);
    var course = randomIntFromInterval(0, 2 * Math.PI);
    var endX = Math.cos(course) * vecLength + posX;
    var endY = Math.sin(course) * vecLength + posY;
    var name = 'N/A';
    return new Ship(posX, posY, endX, endY, name, type, course);
  }
}

function assignTypes(tgtTypes) {
  tgtTypesCopy = _.clone(tgtTypes);
  // Loop through ships in ships afloat
  for (var i = 1; i < shipsAfloat.length; i++) {
    var ship = shipsAfloat[i];
    // Logic for picking vessel type
    // Number of targets is the same as number of types
    if (shipsAfloat.length == tgtTypes.length) {
      //Take a diffenrt tgtTypes for each target
      ship.type = tgtTypes[i - 1];
    }
    // Number of targets is less than number of types
    if (shipsAfloat.length < tgtTypes.length) {
      //Pick a different tgtTypes for each target without replacement
      ship.type = randSampleNoRtrn(tgtTypesCopy);
    }
    // Number of targets is more than number of types
    if (shipsAfloat.length > tgtTypes.length) {
      //Pick a different tgtTypes for each target without replacement until list is empty.
      if (tgtTypesCopy.length > 0) {
        ship.type = randSampleNoRtrn(tgtTypesCopy);
      } else {
        // After working through the list of tgtTypes
        // Make every target the first one on the tgtType list
        ship.type = tgtTypes[0];
      }
    }
  }
}

function genOwnShip() {
  var speed = randomIntFromInterval(5, 23);
  var vecLength = calcvecLength(speed);
  var posX = myCanvas.getBoundingClientRect().width / 2;
  var posY = myCanvas.getBoundingClientRect().height / 2;
  var course = randomIntFromInterval(0, 2 * Math.PI);
  var endX = Math.cos(course) * vecLength + posX;
  var endY = Math.sin(course) * vecLength + posY;
  new OwnShip(posX, posY, endX, endY, course, speed, 'Own Ship');
}

function genScenario(numberCols, numberTgts, cpaThres, tcpaThres) {
  // The number of collisions must be less than the number of targets
  if (numberCols > numberTgts) {
    alert('There cannot be more collisions that targets');
  } else {
    // Generate and check tgts until there are enough collisions .
    colCount = 0;
    while (colCount < numberCols) {
      // Create a single target
      var newShip = createTgts(1);
      // Does the contact meet the require CPA,TCPA and Range criteria.
      // If yes check that they are atleast 0.5 miles from other ships afloat.
      calcCPA(newShip, shipsAfloat[0]);
      vecOwnShip = newShip.position.subtract(shipsAfloat[0].position);
      var range = pixelsToMiles(Math.round(vecOwnShip.length));
      if (
        pixelsToMiles(newShip.cpa) < cpaThres &&
        newShip.tcpa > 0 &&
        newShip.tcpa < tcpaThres &&
        range > 0.8
      ) {
        // If there is one Tgt check ranges
        if (shipsAfloat.length > 2) {
          var ranges = [];
          for (var i = 1; i < shipsAfloat.length; i++) {
            var ship = shipsAfloat[i];
            // Get distance to ship
            vecToNewShip = newShip.position.subtract(ship.position);
            var rangeToNewShip = pixelsToMiles(Math.round(vecToNewShip.length));
            ranges.push(rangeToNewShip);
          }
          if (Math.min.apply(Math, ranges) > 0.5) {
            // Add to shipsAfloat and colCount
            colCount++;
            shipsAfloat.push(newShip);
          }
        }
        // There are no tgts, add first one.
        else {
          colCount++;
          shipsAfloat.push(newShip);
        }
      }
    }

    // All collision have been created add other tgts to meet numberTgts
    while (shipsAfloat.length - 1 < numberTgts) {
      // Create a single target
      newShip = createTgts(1);
      // Does the contact not meet the risk of collision criteria
      // If yes check that they are at least 0.5 miles from other ships afloat.
      calcCPA(newShip, shipsAfloat[0]);
      if (pixelsToMiles(newShip.cpa) > cpaThres && range > 0.8) {
        if (shipsAfloat.length > 2) {
          var ranges = [];
          for (var i = 1; i < shipsAfloat.length; i++) {
            var ship = shipsAfloat[i];
            vecToNewShip = newShip.position.subtract(ship.position);
            var rangeToNewShip = pixelsToMiles(Math.round(vecToNewShip.length));
            ranges.push(rangeToNewShip);
          }
          if (Math.min.apply(Math, ranges) > 0.5) {
            // Add to shipsAfloat and colCount
            shipsAfloat.push(newShip);
          }
        }
      }
    }

    // Assign Tgt Types
    assignTypes(tgtTypes);
    // Add Tgt names and draw each ship
    for (var i = 0; i < shipsAfloat.length; i++) {
      var ship = shipsAfloat[i];
      if (ship.name == 'CNX') {
        ship.name = 'CNX';
      } else {
        if (i > 0 && i < 10) ship.name = '00' + i;
        if (i > 9) ship.name = '0' + i;
      }
      if (i == 1) ship.targetSelected = true;
      drawShip(ship);
    }
    // Create deep nested clone of shipsAfloat that scenario can be reset to.
    orgShipsAfloat = _.cloneDeep(shipsAfloat);
  }
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
window.convertAngle = function (angle) {
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

//Create objects for each scenario

const basicDay = {
  Func1: {
    Name: createNoPlay,
    Par: 2,
  },
  Func2: {
    Name: createXSit,
    Par: false,
  },
  Func3: {
    Name: createXSit,
    Par: true,
  },
  Func4: {
    Name: createOTSit,
    Par: true,
  },
  Func5: {
    Name: createOTSit,
    Par: false,
  },
  Func6: {
    Name: createHOSit,
    Par: null,
  },
  Func7: {
    Name: createHOSit,
    Par: null,
  },
  elevation: 3,
  resVis: false,
  randomSelect: function () {
    // Get all keys in array
    let keys = Object.keys(this);
    // Remove first and last keys
    keys = keys.slice(1);
    keys = keys.slice(0, -4);
    // Get number from 1 - end of keys
    const ranInt = getRandomArbitrary(0, keys.length - 1);
    //Return object
    return this[keys[ranInt]];
  },
  question: {
    questionText:
      'In determining "risk of collision" what does rule 7(d)(i) say about when risk of collision "shall be deemed to exist"?',
    answer:
      'if the compass bearing of an approaching vessel does not appreciably change',
  },
};
const basicNight = {
  Func1: {
    Name: createNoPlay,
    Par: 3,
  },
  Func2: {
    Name: createXSit,
    Par: false,
  },
  Func3: {
    Name: createXSit,
    Par: true,
  },
  Func4: {
    Name: createOTSit,
    Par: true,
  },
  Func5: {
    Name: createOTSit,
    Par: false,
  },
  Func6: {
    Name: createHOSit,
    Par: null,
  },
  Func7: {
    Name: createHOSit,
    Par: null,
  },
  elevation: -90,
  resVis: false,
  randomSelect: function () {
    // Get all keys in array
    let keys = Object.keys(this);
    // Remove first and last keys
    keys = keys.slice(1);
    keys = keys.slice(0, -4);
    // Get number from 1 - end of keys
    const ranInt = getRandomArbitrary(0, keys.length - 1);
    //Return object
    return this[keys[ranInt]];
  },
  question: {
    questionText:
      'What do the rules say about the requirement to keep a look-out?',
    answer:
      'Every vessel shall at all times maintain a proper look-out by sight and hearing as well as by all available means appropriate in the prevailing circumstances and conditions so as to make a full appraisal of the situation and of the risk of collision',
  },
};

const basicNight2 = {
  Func1: {
    Name: createNoPlay,
    Par: 2,
  },
  Func2: {
    Name: createResSit,
    Par: true,
  },
  elevation: -90,
};

const intermediate = {
  Func1: {
    Name: createNoPlay,
    Par: 3,
  },
  Func2: {
    Name: createOTSit,
    Par: false,
  },
};

const advanced = {
  Func1: {
    Name: createNoPlay,
    Par: 3,
  },
  Func2: {
    Name: createXSit,
    Par: true,
  },
  Func3: {
    Name: createHOSit,
    Par: null,
  },
  Func4: {
    Name: createResSit,
    Par: null,
  },
};

const stageFour = {
  Func1: {
    Name: createNoPlay,
    Par: 3,
  },
  Func2: {
    Name: createXSit,
    Par: true,
  },
  Func3: {
    Name: createHOSit,
    Par: null,
  },
  Func4: {
    Name: createResSit,
    Par: null,
  },
  Func5: {
    Name: createCompany,
    Par: null,
  },
};

const crossingGive = {
  Func1: {
    Name: createNoPlay,
    Par: 5,
  },
  Func2: {
    Name: createXSit,
    Par: true,
  },
};

const crossingStand = {
  Func1: {
    Name: createNoPlay,
    Par: 5,
  },
  Func2: {
    Name: createXSit,
    Par: false,
  },
};
const resVis1 = {
  Func1: {
    Name: createNoPlay,
    Par: 3,
  },
  Func2: {
    Name: resVisAhead,
  },
};

const resVis2 = {
  Func1: {
    Name: createNoPlay,
    Par: 2,
  },
  Func2: {
    Name: resVisAbeamAbaft,
    Par: true,
  },
};

const resVis3 = {
  Func1: {
    Name: createNoPlay,
    Par: 2,
  },
  Func2: {
    Name: vesselAtAnchor,
    Par: true,
  },
};

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
        $('#ship-cpa, #ship-cpa-sec').text(pixelsToMiles(ship.cpa).toFixed(1));
        $('#ship-tcpa, #ship-tcpa-sec').text(ship.tcpa.toFixed(1));
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
    /*         new Path([
            ship.vecEnd.add(ship.arrowVector.rotate(135)),
            ship.vecEnd,
            ship.vecEnd.add(ship.arrowVector.rotate(-135))
        ]), */
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

  //Draw sector
  //let urlScen = urlParams.get('scenario')
  if (urlScen === 'stageFour') {
    const centre = new Point(
      myCanvas.getBoundingClientRect().width / 2,
      myCanvas.getBoundingClientRect().height / 2
    );
    var from = new Point(centre.x - 20, centre.y + 20);
    var through = new Point(centre.x + 20, centre.y + 20);
    var to = new Point(centre.x + 20, centre.y - 20);
    var inner = new Path.Arc(from, through, to);
    inner.strokeColor = '#c8f8ff';
    inner.strokeWidth = 2;
    inner.strokeAlpha = 2;
    inner.opacity = 0.5;
    var from = new Point(centre.x - 50, centre.y + 50);
    var through = new Point(centre.x + 50, centre.y + 50);
    var to = new Point(centre.x + 50, centre.y - 50);
    var outer = new Path.Arc(from, through, to);
    outer.strokeColor = '#c8f8ff';
    outer.strokeWidth = 2;
    new Path.Line({
      from: [centre.x - 20, centre.y + 20],
      to: [centre.x - 50, centre.y + 50],
      strokeColor: '#c8f8ff',
      strokeWidth: 2,
    });
    new Path.Line({
      from: [centre.x + 20, centre.y - 20],
      to: [centre.x + 50, centre.y - 50],
      strokeColor: '#c8f8ff',
      strokeWidth: 2,
    });
  }
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

// Controller for moving the scenario backward forward and resetting.

var forward = false;

$('#forward').click(function () {
  for (var i = 0; i < shipsAfloat.length; i++) {
    var ship = shipsAfloat[i];
    if (ship.type != 'Own Ship') {
      var moveVector = ship.relVec.divide(12);
      ship.position = ship.position.add(moveVector);
      ship.vecEnd = ship.vecEnd.add(moveVector);
      calcCPA(ship, shipsAfloat[0]);
      drawShip(ship, shipsAfloat[0]);
    }
  }
});

$('#backward').click(function () {
  for (var i = 0; i < shipsAfloat.length; i++) {
    var ship = shipsAfloat[i];
    if (ship.type != 'Own Ship') {
      var moveVector = ship.relVec.divide(12);
      ship.position = ship.position.subtract(moveVector);
      ship.vecEnd = ship.vecEnd.subtract(moveVector);
      calcCPA(ship, shipsAfloat[0]);
      drawShip(ship);
    }
  }
});

$('#reset').click(function () {
  // Clear canvas
  project.activeLayer.removeChildren();
  shipsAfloat = _.cloneDeep(orgShipsAfloat);
  // Reset Scale & Vec Length
  scale = 12;
  ShipVctrLngth = 6;
  $('#range-scale, #range-scale-sec').text(scale);
  $('#vec-length, #vec-length-sec').text(ShipVctrLngth);
  drawRR();
  // Draw ships afloat
  for (var i = 0; i < shipsAfloat.length; i++) {
    var ship = shipsAfloat[i];
    calcCPA(ship, shipsAfloat[0]);
    drawShip(ship);
  }
});

///////////// Rule based scenarios ////////////////

// Crossing situation
// Own Ship Stand On or Give Way
function createXSit(giveway) {
  let rules = [];
  var x = true;
  while (x) {
    var tempVec = new Point(0, 0); // Generate Vector
    // Create a length from min max ranges
    tempVec.length = randomIntFromInterval(MilesTopixels(5), MilesTopixels(15));
    if (giveway == true) {
      rules = ['15', '16'];
      // Positon to Stb of ownShip
      // Create angle between 5 degrees and 112 degrees from ownShips course
      tempVec.angle = randomIntFromInterval(
        shipsAfloat[0].vector.angle + 5,
        shipsAfloat[0].vector.angle + 112
      );
      var testPos = shipsAfloat[0].position.subtract(tempVec);
    } else {
      rules = ['15', '17'];
      // Create angle between 5 degrees and 112 degrees from ownShips course
      tempVec.angle = randomIntFromInterval(
        shipsAfloat[0].vector.angle - 5,
        shipsAfloat[0].vector.angle - 112
      );
      // Positon to Port of ownShip
      var testPos = shipsAfloat[0].position.subtract(tempVec);
    }
    var type = 'PDV';
    // If statement to prevent generating an overtaking situation.
    if (Math.abs(shipsAfloat[0].vector.angle - tempVec.angle) < 67.5) {
      var min = shipsAfloat[0];
    } else {
      var min = 2;
    }
    let max = 28.0;
    var speed = randomIntFromInterval(min, max);
    var vecLength = calcvecLength(speed);
    var posX = testPos.x;
    var posY = testPos.y;
    var course = randomIntFromInterval(0, 2 * Math.PI);
    var endX = Math.cos(course) * vecLength + posX;
    var endY = Math.sin(course) * vecLength + posY;
    var name = 'test';
    let tempShip = new Ship(
      posX,
      posY,
      endX,
      endY,
      name,
      type,
      course,
      rules,
      speed,
      true
    );
    calcCPA(tempShip, shipsAfloat[0]);
    x = criteriaCheck(tempShip, 0.6, 25);
  }
}

// Head On Siuation
function createHOSit() {
  var x = true;
  let rules = ['14'];
  while (x) {
    var tempVec = new Point(0, 0); // Generate Vector
    // Create a length that is a min of 0.5 nm and max of 10 nm
    tempVec.length = randomIntFromInterval(MilesTopixels(5), MilesTopixels(8));
    // Create angle between -1 and 1 degree from ownShips course
    tempVec.angle = randomIntFromInterval(
      shipsAfloat[0].vector.angle - 1,
      shipsAfloat[0].vector.angle - 1
    );
    let testPos = shipsAfloat[0].position.subtract(tempVec);
    var type = 'PDV';
    var speed = randomIntFromInterval(2.0, 28.0);
    var vecLength = calcvecLength(speed);
    var posX = testPos.x;
    var posY = testPos.y;
    var course = shipsAfloat[0].vector.angle * (Math.PI / 180);
    var endX = Math.cos(course) * vecLength + posX;
    var endY = Math.sin(course) * vecLength + posY;
    var name = 'test';
    const tempShip = new Ship(
      posX,
      posY,
      endX,
      endY,
      name,
      type,
      course,
      rules,
      speed,
      true
    );
    calcCPA(tempShip, shipsAfloat[0]);
    x = criteriaCheck(tempShip, 0.5, 59);
  }
}

// Overtaking Siuation
function createOTSit(overtaking) {
  var x = true;
  while (x) {
    let rules = [];
    var tempVec = new Point(0, 0); // Generate Vector
    // Create a length that is a min of 1.5nm and max of 10 nm
    tempVec.length = randomIntFromInterval(MilesTopixels(4), MilesTopixels(10));
    if (overtaking == true) {
      rules = ['13', '16'];
      // Create angle between - 10 degrees and 10 degrees from ownShips course
      tempVec.angle =
        shipsAfloat[0].vector.angle + randomIntFromInterval(-10, 10);
      var testPos = shipsAfloat[0].position.subtract(tempVec);
      // Course is a function of angle from ownship to ensure the ownship is approaching from
      // an angle greater than 22.5 degree abaft the beam.
      var course =
        (tempVec.angle + randomIntFromInterval(-67, 67)) * (Math.PI / 180) +
        Math.PI;
      // Speed less than ownShip
      var speed = randomIntFromInterval(2.0, shipsAfloat[0].speed - 1);
      var name = 'Being Overtaken';
      // Vessel types in scenario
      //tgtTypes = ["PDV","SV","VEIF","NUC","RAM"];
      var probs = [70, 10, 10, 5, 5];
      var type = randomSampleProb(tgtTypes, probs);
    } else {
      rules = ['13', '17'];
      // Create angle between - 170 degrees and 170 degrees from ownShips course
      tempVec.angle =
        shipsAfloat[0].vector.angle + randomIntFromInterval(150, 210);
      testPos = shipsAfloat[0].position.subtract(tempVec);
      // Course is a function of angle from ownship to ensure the overtaking ship is approaching from
      // an angle greater than 22.5 degree abaft the beam.
      var course =
        (shipsAfloat[0].vector.angle + randomIntFromInterval(-67, 67)) *
          (Math.PI / 180) +
        Math.PI;
      // Speed greater than ownShip
      var speed = randomIntFromInterval(shipsAfloat[0].speed + 1, 29.0);
      var name = 'Overtaking';
      // Vessel types in scenario
      //tgtTypes = ["PDV","SV","VEIF","NUC","RAM"];
      // For realism only be overtaken by SV and VEIF if going below 7kts
      if (shipsAfloat[0].speed < 7) {
        var probs = [10, 45, 45, 0, 0];
        var type = randomSampleProb(tgtTypes, probs);
        // realistic SV and VEIF speeds
        if (['SV', 'VEIF'].includes(type)) {
          var speed = randomIntFromInterval(shipsAfloat[0].speed + 1, 10);
        }
      } else {
        var type = 'PDV';
        var speed = randomIntFromInterval(shipsAfloat[0].speed + 1, 29.0);
      }
    }
    var vecLength = calcvecLength(speed);
    var posX = testPos.x;
    var posY = testPos.y;
    var endX = Math.cos(course) * vecLength + posX;
    var endY = Math.sin(course) * vecLength + posY;
    const tempShip = new Ship(
      posX,
      posY,
      endX,
      endY,
      name,
      type,
      course,
      rules,
      speed,
      true
    );
    calcCPA(tempShip, shipsAfloat[0]);
    x = criteriaCheck(tempShip, 1, 59);
  }
}
function createResSit() {
  var x = true;
  let rules = ['18', '18a', '16'];
  while (x) {
    var tempVec = new Point(0, 0); // Generate Vector
    // Create a length that is a min of 0.5 nm and max of 15 nm
    tempVec.length = randomIntFromInterval(MilesTopixels(2), MilesTopixels(5));
    // Create angle from ownShips course
    tempVec.angle = randomIntFromInterval(0, 360);
    testPos = shipsAfloat[0].position.subtract(tempVec);
    // Vessel types in scenario
    //tgtTypes = ["PDV","SV","VEIF","NUC","RAM"];
    var probs = [0, 25, 25, 25, 25];
    var type = randomSampleProb(tgtTypes, probs);
    var speed = randomIntFromInterval(1, 8);
    var vecLength = calcvecLength(speed);
    var posX = testPos.x;
    var posY = testPos.y;
    var course = randomIntFromInterval(0, 2 * Math.PI);
    var endX = Math.cos(course) * vecLength + posX;
    var endY = Math.sin(course) * vecLength + posY;
    var name = 'Responsibility';
    var tempShip = new Ship(
      posX,
      posY,
      endX,
      endY,
      name,
      type,
      course,
      rules,
      speed,
      true
    );
    calcCPA(tempShip, shipsAfloat[0]);
    x = criteriaCheck(tempShip, 0.8, 25);
  }
}

function createCompany() {
  const rules = [{ Note: 'Special Maneuvering Rules apply' }];
  var type = 'PDV';
  var speed = shipsAfloat[0].speed;
  var vecLength = calcvecLength(speed);
  var posX = shipsAfloat[0].position.x + 50;
  var posY = shipsAfloat[0].position.y;
  var course = shipsAfloat[0].course;
  var endX = Math.cos(course) * vecLength + posX;
  var endY = Math.sin(course) * vecLength + posY;
  var name = 'CNX';
  var tempShip = new Ship(
    posX,
    posY,
    endX,
    endY,
    name,
    type,
    course,
    rules,
    speed,
    false
  );
  calcCPA(tempShip, shipsAfloat[0]);
  shipsAfloat.push(tempShip);
}

function createNoPlay(numberTgts) {
  let rules = [];
  //  other tgts to meet numberTgts
  var count = 0;
  while (count < numberTgts) {
    // Vessel types in scenario
    //tgtTypes = ["PDV","SV","VEIF","NUC","RAM"];
    var probs = [40, 20, 20, 10, 10];
    var type = randomSampleProb(tgtTypes, probs);
    // realistic SV and VEIF speeds
    if (['SV', 'VEIF'].includes(type)) {
      var speed = randomIntFromInterval(3, 9);
    }
    if (['NUC', 'RAM'].includes(type)) {
      var speed = randomIntFromInterval(2, 7);
    }
    if (type == 'PDV') {
      var speed = randomIntFromInterval(1, 27);
    }
    var vecLength = calcvecLength(speed);
    var tempVec = new Point(0, 0); // Generate Vector
    // Create a length that is a min of 2 nm and max of 15 nm
    tempVec.length = randomIntFromInterval(MilesTopixels(2), MilesTopixels(15));
    // Create angle from ownShips course
    tempVec.angle = randomIntFromInterval(0, 360);
    var testPos = shipsAfloat[0].position.subtract(tempVec);
    var posX = testPos.x;
    var posY = testPos.y;
    var course = randomIntFromInterval(0, 2 * Math.PI);
    var endX = Math.cos(course) * vecLength + posX;
    var endY = Math.sin(course) * vecLength + posY;
    var name = 'N/A';
    var tempShip = new Ship(
      posX,
      posY,
      endX,
      endY,
      name,
      type,
      course,
      rules,
      speed,
      false
    );
    // Does the contact not meet the risk of collision criteria
    // If yes check that they are atleast 0.5 miles from other ships afloat.
    calcCPA(tempShip, shipsAfloat[0]);

    // Check CPA is greater than 2 NM
    if (
      pixelsToMiles(tempShip.cpa) > 2 &&
      pixelsToMiles(Math.round(tempVec.length)) > 0.8
    ) {
      if (shipsAfloat.length > 2) {
        var ranges = [];
        for (var i = 1; i < shipsAfloat.length; i++) {
          var ship = shipsAfloat[i];
          const vecToTempShip = tempShip.position.subtract(ship.position);
          var rangeToTempShip = pixelsToMiles(Math.round(vecToTempShip.length));
          ranges.push(rangeToTempShip);
        }
        // Range from other ships greater than 0.5nm
        if (Math.min.apply(Math, ranges) > 0.5) {
          // Add to shipsAfloat and add to Count
          shipsAfloat.push(tempShip);
          count++;
        }
      }
      // There are no tgts, add first one.
      else {
        shipsAfloat.push(tempShip);
        count++;
      }
    }
  }
}

// ResVis
// Vessel ahead of beam
function resVisAhead() {
  var x = true;
  while (x) {
    var tempVec = new Point(0, 0); // Generate Vector
    // Create a length that is a min of 1nm and max of 10 nm
    tempVec.length = randomIntFromInterval(MilesTopixels(3), MilesTopixels(7));
    let rules = ['19'];
    // Positon ahead of beam ownShip
    // Create angle between -89 degrees and 89 degrees from ownShips course
    tempVec.angle = randomIntFromInterval(
      shipsAfloat[0].vector.angle - 89,
      shipsAfloat[0].vector.angle + 89
    );
    const testPos = shipsAfloat[0].position.subtract(tempVec);
    var type = 'PDV'; // For Model
    var typeSound = 'PDV - making way';
    // If statement to prevent generating an overtaking situation.
    if (Math.abs(shipsAfloat[0].vector.angle - tempVec.angle) < 67.5) {
      var min = shipsAfloat[0];
    } else {
      var min = 2;
    }
    const max = 28.0;
    var speed = randomIntFromInterval(min, max);
    var vecLength = calcvecLength(speed);
    var posX = testPos.x;
    var posY = testPos.y;
    var course = randomIntFromInterval(0, 2 * Math.PI);
    var endX = Math.cos(course) * vecLength + posX;
    var endY = Math.sin(course) * vecLength + posY;
    var name = 'test';
    const tempShip = new Ship(
      posX,
      posY,
      endX,
      endY,
      name,
      type,
      course,
      rules,
      speed,
      true,
      typeSound
    );
    calcCPA(tempShip, shipsAfloat[0]);
    x = criteriaCheck(tempShip, 0.6, 25);
  }
}

// Vessel abeam or abaft beam
function resVisAbeamAbaft() {
  var x = true;
  while (x) {
    var tempVec = new Point(0, 0); // Generate Vector
    // Create a length that is a min of 1nm and max of 10 nm
    tempVec.length = randomIntFromInterval(
      MilesTopixels(1.5),
      MilesTopixels(15)
    );
    const rules = ['19'];
    // Positon ahead of beam ownShip
    // Create angle between - degrees and 89 degrees from ownShips course
    tempVec.angle = randomIntFromInterval(
      shipsAfloat[0].vector.angle + 90,
      shipsAfloat[0].vector.angle + 270
    );
    let testPos = shipsAfloat[0].position.subtract(tempVec);
    var type = 'PDV'; // For model
    var typeSound = 'PDV - making way';
    const max = 28.0;
    const min = 4;
    var speed = randomIntFromInterval(min, max);
    var vecLength = calcvecLength(speed);
    var posX = testPos.x;
    var posY = testPos.y;
    var course = randomIntFromInterval(0, 2 * Math.PI);
    var endX = Math.cos(course) * vecLength + posX;
    var endY = Math.sin(course) * vecLength + posY;
    var name = 'test';
    const tempShip = new Ship(
      posX,
      posY,
      endX,
      endY,
      name,
      type,
      course,
      rules,
      speed,
      true,
      typeSound
    );
    calcCPA(tempShip, shipsAfloat[0]);
    x = criteriaCheck(tempShip, 0.6, 25);
  }
}

// Vessel at anchor
function vesselAtAnchor() {
  var x = true;
  while (x) {
    var tempVec = new Point(0, 0); // Generate Vector
    // Create a length that is a min of 1nm and max of 10 nm
    tempVec.length = randomIntFromInterval(MilesTopixels(1), MilesTopixels(2));
    // Positon ahead of beam ownShip
    // Create angle between - degrees and 89 degrees from ownShips course
    tempVec.angle = randomIntFromInterval(
      shipsAfloat[0].vector.angle + 90,
      shipsAfloat[0].vector.angle + 270
    );
    testPos = shipsAfloat[0].position.subtract(tempVec);
    var type = 'PDV';
    var typeSound = 'anchorless100m';
    var speed = 0;
    var vecLength = calcvecLength(speed);
    var posX = testPos.x;
    var posY = testPos.y;
    var course = randomIntFromInterval(0, 2 * Math.PI);
    var endX = Math.cos(course) * vecLength + posX;
    var endY = Math.sin(course) * vecLength + posY;
    var name = 'test';
    const tempShip = new Ship(
      posX,
      posY,
      endX,
      endY,
      name,
      type,
      course,
      rules,
      speed,
      typeSound
    );
    calcCPA(tempShip, shipsAfloat[0]);
    x = criteriaCheck(tempShip, 2, 30);
  }
}

// Function for checking that a newShip meets the risk of collision criteria
// and that they are aren't on top of another vessel
function criteriaCheck(newShip, cpaThres, tcpaThres) {
  const vecOwnShip = newShip.position.subtract(shipsAfloat[0].position);
  var range = pixelsToMiles(Math.round(vecOwnShip.length));
  if (
    pixelsToMiles(newShip.cpa) < cpaThres &&
    newShip.tcpa > 0 &&
    newShip.tcpa < tcpaThres &&
    range > 2
  ) {
    // If there is one Tgt check ranges
    if (shipsAfloat.length > 2) {
      var ranges = [];
      for (var i = 1; i < shipsAfloat.length; i++) {
        var ship = shipsAfloat[i];
        // Get distance to ship
        const vecToNewShip = newShip.position.subtract(ship.position);
        var rangeToNewShip = pixelsToMiles(Math.round(vecToNewShip.length));
        ranges.push(rangeToNewShip);
      }
      // Check that the newShip is no closer than 0.5nm to any other ship.
      if (Math.min.apply(Math, ranges) > 0.5) {
        // Add to shipsAfloat
        shipsAfloat.push(newShip);
        return false;
      }
    }
    // There are no tgts, add first one.
    else {
      shipsAfloat.push(newShip);
      return false;
    }
  } else {
    return true;
  }
}

//Random sample with probabilities
function randomSampleProb(types, weights) {
  // [0..1) * sum of weight
  var sample = Math.random() * weights.reduce((sum, weight) => sum + weight, 0);
  // first sample n where sum of weight for [0..n] > sample
  var index = weights.findIndex((weight) => (sample -= weight) < 0);

  return types[index];
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

///////////// Things that happen after clicking Next ////////////////

const completeReport = function () {
  // The is where the final data gets sent to the API
  console.log(
    `intentions: ${intentionsArr} | contactReports: ${contactReports} | finalShipsAfloat: ${shipsAfloat}`
  );
  // reqData('PATCH', `${APIURL}api/scenarios/${scenarioId}`, {
  //   intentions: intentionsArr,
  //   contactReports: contactReports,
  //   finalShipsAfloat: shipsAfloat,
  //   end: Date.now(),
  // })
  //   .then((res) => {})
  //   .catch((error) => {
  //     console.log(error);
  //   });
};

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

export {
  calcvecLength,
  calcCPA,
  completeReport,
  question,
  urlScen,
  drawShip,
  updateShips,
};

// Dynamic import of 3d rendering module
// function initThreeDRenderingModule() {
//   return import('./3dmodv2.js')
//     .then(() => {
//       buildThreeDRendering();
//     })
//     .catch(
//       (error) => 'An error occurred while loading the three d rendering module'
//     );
// }
