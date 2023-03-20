// All distance values are in Nautical Miles
// The datum is 0,0
let genData = { genShipsAfloat: [] };
const tgtTypes = ['PDV', 'SV', 'VEIF', 'NUC', 'RAM'];
const ShipVctrLngth = 6;

function createScenario(type) {
  genData.center = new Point(500, 500);
  genOwnShip();
  switch (true) {
    case type == 'intermediate':
      Object.values(intermediate).forEach((val) => val.Name(val.Par));
      genData.elevation = basicDay.elevation;
      genData.resVis = basicDay.resVis;
      break;
    case type == 'advanced':
      Object.values(advanced).forEach((val) => val.Name(val.Par));
      break;
    case type == 'stageFour':
      Object.values(stageFour).forEach((val) => val.Name(val.Par));
      break;
    case type == 'crossingGive':
      Object.values(crossingGive).forEach((val) => val.Name(val.Par));
      break;
    case type == 'crossingStand':
      Object.values(crossingStand).forEach((val) => val.Name(val.Par));
      break;
    case type == 'resvis1':
      Object.values(resVis1).forEach((val) => val.Name(val.Par));
      genData.resVis = true;
      break;
    case type == 'basicNight2':
      Object.values(basicNight2)
        .slice(0, -1)
        .forEach((val) => val.Name(val.Par));
      genData.elevation = basicNight2.elevation;
      break;
    case type == 'resvis2':
      Object.values(resVis2)
        .slice(0, -1)
        .forEach((val) => val.Name(val.Par));
      genData.resVis = true;
      genData.question = resVis2.question;
      break;
    case type == 'basicDay':
      // Create no play
      basicDay.Func1.Name(basicDay.Func1.Par);

      // Create one of the other available scenarios
      const scenSelectDay = basicDay.randomSelect();
      scenSelectDay.Name(scenSelectDay.Par);

      genData.elevation = basicDay.elevation;
      genData.resVis = basicDay.resVis;
      genData.question = basicDay.question;
      break;
    case type == 'basicNight':
      // Create no play
      basicNight.Func1.Name(basicNight.Func1.Par);

      // Create one of the other available scenarios
      const scenSelectNight = basicNight.randomSelect();
      scenSelectNight.Name(scenSelectNight.Par);

      genData.elevation = basicNight.elevation;
      genData.resVis = basicNight.resVis;
      genData.question = basicNight.question;
      break;
  }
  // Create tgt names
  genData.genShipsAfloat.forEach((ship, i) => {
    switch (true) {
      case i > 0:
        ship.name = '00' + i;
        break;
      case i > 9:
        ship.name = '0' + i;
        break;
    }
    if (i == 1) ship.targetSelected = true;
  });
  return genData;
}

//Return whole number
function getRandomArbitrary(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function USNRel(bearing, course) {
  const x = recip(bearing) - course;
  if (x < 0) return x + 360;
  else return x;
}

// Find reciprocal bearing
function recip(bearing) {
  if (bearing > 180) return bearing - 180;
  else return bearing + 180;
}

// Generator function

// Create Own Ship
function genOwnShip() {
  var speed = randomIntFromInterval(5, 23);
  var vecLength = calcvecLength(speed);
  var posX = 500;
  var posY = 500;
  var course = randomIntFromInterval(0, 2 * Math.PI);
  var endX = Math.cos(course) * vecLength + posX;
  var endY = Math.sin(course) * vecLength + posY;
  new OwnShip(posX, posY, endX, endY, course, speed, 'Own Ship');
}

// Own Ship Constructor
function OwnShip(positionX, positionY, vecEndX, vecEndY, course, speed, type) {
  this.position = new Point(positionX, positionY); // Own Ship is always positioned at 500,500
  this.vecEnd = new Point(vecEndX, vecEndY);
  this.type = type;
  this.vector = this.position.subtract(this.vecEnd);
  this.posSelected = false;
  this.vecSelected = false;
  this.course = course;
  this.speed = speed;
  genData.genShipsAfloat.push(this);
}

// Ship Constructor

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
  this.vecOwnShip = this.position.subtract(genData.genShipsAfloat[0].position);
  this.OwnShipAngle = this.vecOwnShip.angle;
  this.relposX = this.vecOwnShip.x;
  this.relposY = this.vecOwnShip.y;
  this.range = this.vecOwnShip.length;
  this.name = name;
  this.cpa;
  this.tcpa;
  this.rules = rules;
  this.bearings = [];
  this.bearingsTaken = [];
  this.selectCount = 0;
  this.toBeReported = toBeReported;
}

// Crossing situation
// Own Ship Stand On or Give Way
function createXSit(giveway) {
  let rules = [];
  var x = true;
  while (x) {
    var tempVec = new Point(0, 0); // Generate Vector
    // Create a length from min max ranges
    tempVec.length = randomIntFromInterval(5, 15);
    if (giveway == true) {
      rules = ['15', '16'];
      // Positon to Stb of ownShip
      // Create angle between 5 degrees and 112 degrees from ownShips course
      tempVec.angle = randomIntFromInterval(
        genData.genShipsAfloat[0].vector.angle + 5,
        genData.genShipsAfloat[0].vector.angle + 112
      );
      var testPos = genData.genShipsAfloat[0].position.subtract(tempVec);
    } else {
      rules = ['15', '17'];
      // Create angle between 5 degrees and 112 degrees from ownShips course
      tempVec.angle = randomIntFromInterval(
        genData.genShipsAfloat[0].vector.angle - 5,
        genData.genShipsAfloat[0].vector.angle - 112
      );
      // Position to Port of ownShip
      var testPos = genData.genShipsAfloat[0].position.subtract(tempVec);
    }
    var type = 'PDV';
    // If statement to prevent generating an overtaking situation.
    if (
      Math.abs(genData.genShipsAfloat[0].vector.angle - tempVec.angle) < 67.5
    ) {
      var min = genData.genShipsAfloat[0];
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
    calcCPA(tempShip, genData.genShipsAfloat[0]);
    x = criteriaCheck(tempShip, 0.6, 25);
  }
}

// Head On Situation
function createHOSit() {
  var x = true;
  let rules = ['14'];
  while (x) {
    var tempVec = new Point(0, 0); // Generate Vector
    // Create a length that is a min of 0.5 nm and max of 8 nm
    tempVec.length = randomIntFromInterval(5, 8);
    // Create angle between -1 and 1 degree from ownShips course
    tempVec.angle = randomIntFromInterval(
      genData.genShipsAfloat[0].vector.angle - 1,
      genData.genShipsAfloat[0].vector.angle - 1
    );
    let testPos = genData.genShipsAfloat[0].position.subtract(tempVec);
    var type = 'PDV';
    var speed = randomIntFromInterval(2.0, 28.0);
    var vecLength = calcvecLength(speed);
    var posX = testPos.x;
    var posY = testPos.y;
    var course = genData.genShipsAfloat[0].vector.angle * (Math.PI / 180);
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
    calcCPA(tempShip, genData.genShipsAfloat[0]);
    x = criteriaCheck(tempShip, 0.5, 59);
  }
}

// Overtaking Situation
function createOTSit(overtaking) {
  var x = true;
  while (x) {
    let rules = [];
    var tempVec = new Point(0, 0); // Generate Vector
    // Create a length that is a min of 4 nm and max of 10 nm
    tempVec.length = randomIntFromInterval(4, 10);
    if (overtaking == true) {
      rules = ['13', '16'];
      // Create angle between - 10 degrees and 10 degrees from ownShips course
      tempVec.angle =
        genData.genShipsAfloat[0].vector.angle + randomIntFromInterval(-10, 10);
      var testPos = genData.genShipsAfloat[0].position.subtract(tempVec);
      // Course is a function of angle from ownship to ensure the ownship is approaching from
      // an angle greater than 22.5 degree abaft the beam.
      var course =
        (tempVec.angle + randomIntFromInterval(-67, 67)) * (Math.PI / 180) +
        Math.PI;
      // Speed less than ownShip
      var speed = randomIntFromInterval(
        2.0,
        genData.genShipsAfloat[0].speed - 1
      );
      var name = 'Being Overtaken';
      // Vessel types in scenario
      //tgtTypes = ["PDV","SV","VEIF","NUC","RAM"];
      var probs = [70, 10, 10, 5, 5];
      var type = randomSampleProb(tgtTypes, probs);
    } else {
      rules = ['13', '17'];
      // Create angle between - 170 degrees and 170 degrees from ownShips course
      tempVec.angle =
        genData.genShipsAfloat[0].vector.angle +
        randomIntFromInterval(150, 210);
      testPos = genData.genShipsAfloat[0].position.subtract(tempVec);
      // Course is a function of angle from ownship to ensure the overtaking ship is approaching from
      // an angle greater than 22.5 degree abaft the beam.
      var course =
        (genData.genShipsAfloat[0].vector.angle +
          randomIntFromInterval(-67, 67)) *
          (Math.PI / 180) +
        Math.PI;
      // Speed greater than ownShip
      var speed = randomIntFromInterval(
        genData.genShipsAfloat[0].speed + 1,
        29.0
      );
      var name = 'Overtaking';
      // Vessel types in scenario
      //tgtTypes = ["PDV","SV","VEIF","NUC","RAM"];
      // For realism only be overtaken by SV and VEIF if going below 7kts
      if (genData.genShipsAfloat[0].speed < 7) {
        var probs = [10, 45, 45, 0, 0];
        var type = randomSampleProb(tgtTypes, probs);
        // realistic SV and VEIF speeds
        if (['SV', 'VEIF'].includes(type)) {
          var speed = randomIntFromInterval(
            genData.genShipsAfloat[0].speed + 1,
            10
          );
        }
      } else {
        var type = 'PDV';
        var speed = randomIntFromInterval(
          genData.genShipsAfloat[0].speed + 1,
          29.0
        );
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
    calcCPA(tempShip, genData.genShipsAfloat[0]);
    x = criteriaCheck(tempShip, 1, 59);
  }
}
function createResSit() {
  let x = true;
  let rules = ['18', '18a', '16'];
  while (x) {
    let tempVec = new Point(0, 0); // Generate Vector
    // Create a length that is a min of 0.5 nm and max of 15 nm
    tempVec.length = randomIntFromInterval(2, 5);
    // Create angle from ownShips course
    tempVec.angle = randomIntFromInterval(0, 360);
    let testPos = genData.genShipsAfloat[0].position.subtract(tempVec);
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
    calcCPA(tempShip, genData.genShipsAfloat[0]);
    x = criteriaCheck(tempShip, 0.8, 25);
  }
}

function createCompany() {
  const rules = [{ Note: 'Special Maneuvering Rules apply' }];
  var type = 'PDV';
  var speed = genData.genShipsAfloat[0].speed;
  var vecLength = calcvecLength(speed);
  var posX = genData.genShipsAfloat[0].position.x + 50;
  var posY = genData.genShipsAfloat[0].position.y;
  var course = genData.genShipsAfloat[0].course;
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
  calcCPA(tempShip, genData.genShipsAfloat[0]);
  genShipsAfloat.push(tempShip);
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
    tempVec.length = randomIntFromInterval(2, 15);
    // Create angle from ownShips course
    tempVec.angle = randomIntFromInterval(0, 360);
    var testPos = genData.genShipsAfloat[0].position.subtract(tempVec);
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
    calcCPA(tempShip, genData.genShipsAfloat[0]);

    // Check CPA is greater than 2 NM
    if (tempShip.cpa > 2 && Math.round(tempVec.length) > 0.8) {
      if (genData.genShipsAfloat.length > 2) {
        var ranges = [];
        for (var i = 1; i < genData.genShipsAfloat.length; i++) {
          var ship = genData.genShipsAfloat[i];
          const vecToTempShip = tempShip.position.subtract(ship.position);
          var rangeToTempShip = Math.round(vecToTempShip.length);
          ranges.push(rangeToTempShip);
        }
        // Range from other ships greater than 0.5nm
        if (Math.min.apply(Math, ranges) > 0.5) {
          // Add to genShipsAfloat and add to Count
          genData.genShipsAfloat.push(tempShip);
          count++;
        }
      }
      // There are no tgts, add first one.
      else {
        genData.genShipsAfloat.push(tempShip);
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
    tempVec.length = randomIntFromInterval(3, 7);
    let rules = ['19'];
    // Positon ahead of beam ownShip
    // Create angle between -89 degrees and 89 degrees from ownShips course
    tempVec.angle = randomIntFromInterval(
      genData.genShipsAfloat[0].vector.angle - 89,
      genData.genShipsAfloat[0].vector.angle + 89
    );
    const testPos = genData.genShipsAfloat[0].position.subtract(tempVec);
    var type = 'PDV'; // For Model
    var typeSound = 'PDV - making way';
    // If statement to prevent generating an overtaking situation.
    if (
      Math.abs(genData.genShipsAfloat[0].vector.angle - tempVec.angle) < 67.5
    ) {
      var min = genData.genShipsAfloat[0];
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
    calcCPA(tempShip, genData.genShipsAfloat[0]);
    x = criteriaCheck(tempShip, 0.6, 25);
  }
}

// Vessel abeam or abaft beam
function resVisAbeamAbaft() {
  var x = true;
  while (x) {
    var tempVec = new Point(0, 0); // Generate Vector
    // Create a length that is a min of 1.5nm and max of 15 nm
    tempVec.length = randomIntFromInterval(1.5, 15);
    const rules = ['19'];
    // Positon ahead of beam ownShip
    // Create angle between - degrees and 89 degrees from ownShips course
    tempVec.angle = randomIntFromInterval(
      genData.genShipsAfloat[0].vector.angle + 90,
      genData.genShipsAfloat[0].vector.angle + 270
    );
    let testPos = genData.genShipsAfloat[0].position.subtract(tempVec);
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
    calcCPA(tempShip, genData.genShipsAfloat[0]);
    x = criteriaCheck(tempShip, 0.6, 25);
  }
}

// Vessel at anchor
function vesselAtAnchor() {
  var x = true;
  while (x) {
    var tempVec = new Point(0, 0); // Generate Vector
    // Create a length that is a min of 1nm and max of 10 nm
    tempVec.length = randomIntFromInterval(1, 2);
    // Positon ahead of beam ownShip
    // Create angle between - degrees and 89 degrees from ownShips course
    tempVec.angle = randomIntFromInterval(
      genData.genShipsAfloat[0].vector.angle + 90,
      genData.genShipsAfloat[0].vector.angle + 270
    );
    testPos = genData.genShipsAfloat[0].position.subtract(tempVec);
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
    calcCPA(tempShip, genData.genShipsAfloat[0]);
    x = criteriaCheck(tempShip, 2, 30);
  }
}

// General Functions //

function calcvecLength(speed) {
  const miles = (speed / 60) * ShipVctrLngth;
  return miles;
}

// Function for checking that a newShip meets the risk of collision criteria
// and that they are aren't on top of another vessel
function criteriaCheck(newShip, cpaThres, tcpaThres) {
  const vecOwnShip = newShip.position.subtract(
    genData.genShipsAfloat[0].position
  );
  var range = Math.round(vecOwnShip.length);
  if (
    newShip.cpa < cpaThres &&
    newShip.tcpa > 0 &&
    newShip.tcpa < tcpaThres &&
    range > 2
  ) {
    // If there is one Tgt check ranges
    if (genData.genShipsAfloat.length > 2) {
      var ranges = [];
      for (var i = 1; i < genData.genShipsAfloat.length; i++) {
        var ship = genData.genShipsAfloat[i];
        // Get distance to ship
        const vecToNewShip = newShip.position.subtract(ship.position);
        var rangeToNewShip = Math.round(vecToNewShip.length);
        ranges.push(rangeToNewShip);
      }
      // Check that the newShip is no closer than 0.5nm to any other ship.
      if (Math.min.apply(Math, ranges) > 0.5) {
        // Add to genShipsAfloat
        genData.genShipsAfloat.push(newShip);
        return false;
      }
    }
    // There are no tgts, add first one.
    else {
      genShipsAfloat.push(newShip);
      return false;
    }
  } else {
    return true;
  }
}

// Functions for picking random numbers
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.random() * (max - 1 - min + 1) + min;
}

//Random sample with probabilities
function randomSampleProb(types, weights) {
  // [0..1) * sum of weight
  var sample = Math.random() * weights.reduce((sum, weight) => sum + weight, 0);
  // first sample n where sum of weight for [0..n] > sample
  var index = weights.findIndex((weight) => (sample -= weight) < 0);

  return types[index];
}

function randSampleNoRtrn(list) {
  var randomIndex = Math.floor(Math.random() * list.length);
  return list.splice(randomIndex, 1)[0];
}

function assignTypes(tgtTypes) {
  tgtTypesCopy = _.clone(tgtTypes);
  // Loop through ships in ships afloat
  for (var i = 1; i < genShipsAfloat.length; i++) {
    var ship = genShipsAfloat[i];
    // Logic for picking vessel type
    // Number of targets is the same as number of types
    if (genShipsAfloat.length == tgtTypes.length) {
      //Take a different tgtTypes for each target
      ship.type = tgtTypes[i - 1];
    }
    // Number of targets is less than number of types
    if (genShipsAfloat.length < tgtTypes.length) {
      //Pick a different tgtTypes for each target without replacement
      ship.type = randSampleNoRtrn(tgtTypesCopy);
    }
    // Number of targets is more than number of types
    if (genShipsAfloat.length > tgtTypes.length) {
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

// Convert Vector angles to compass bearing
const convertAngle = function (angle) {
  if (angle >= -90 && angle <= 180) return (angle += 90);
  else return (angle += 450);
};

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
  ship.cpa = distance;
}

//Objects for each scenario

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
  elevation: -90,
  resVis: false,
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
export { createScenario };
