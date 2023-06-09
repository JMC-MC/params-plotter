// Import values from app
import { params } from './app.js';
import cloneDeep from 'lodash/cloneDeep';
import * as Calculate from './utils/calculators.js';

// JQUERY adjustment to get number for number inputs
$.valHooks.number = {
  get: function (elem) {
    return elem.value * 1;
  },
};

let contactReports = []; // Create array to store contact reports and actions.
var currentTab = 0; // Current tab is set to be the first tab (0)
let selectedRules = []; // Create array to store rule IDs in drop zone
let completedRepsNo = []; // Create array for storing a list of completed reports
let intentionsArr = []; // Create array for storing intentions
let reReportsArr = [];
let pnctArr = [];
let reportShipsAfloat = '';

// Constructor for Contact Reports
function contactReport(tgtNo) {
  this.start = Date.now();
  this.tgtNo = tgtNo;
  this.relColour = {
    reported: '',
    actual: '',
    mark: {
      type: 'binary',
      availableMarks: 1,
      awardedMarks: '',
    },
  };
  this.relBearing = {
    reported: '',
    actual: '',
    mark: {
      type: 'margin',
      availableMarks: 1,
      moe: 5,
      awardedMarks: '',
    },
  };
  this.range = {
    reported: '',
    actual: '',
    mark: {
      type: 'margin',
      availableMarks: 1,
      moe: 1,
      awardedMarks: '',
    },
  };
  this.type = {
    reported: '',
    actual: '',
    mark: {
      type: 'binary',
      availableMarks: 1,
      awardedMarks: '',
    },
  };
  this.held = {
    reported: {
      visual: '',
      radar: '',
    },
    actual: {
      visual: '',
      radar: '',
    },
    mark: {
      type: 'binary',
      availableMarks: 1,
      awardedMarks: '',
    },
    comment: '',
  };

  this.aspectBearing = {
    reported: '',
    actual: '',
    mark: {
      type: 'margin',
      availableMarks: 1,
      moe: 5,
      awardedMarks: '',
    },
  };

  this.aspectSide = {
    reported: '',
    actual: '',
    mark: {
      type: 'binary',
      availableMarks: 1,
      awardedMarks: '',
    },
  };
  this.bearingDirection = {
    reported: '',
    actual: {
      direction: '',
      rate: '',
      rateUnit: 'deg/Min',
    },
    mark: {
      type: 'binary',
      availableMarks: 1,
      awardedMarks: '',
    },
  };
  this.cpa = {
    reported: '',
    actual: '',
    mark: {
      type: 'margin',
      availableMarks: 1,
      moe: 0.2,
      awardedMarks: '',
    },
  };
  this.cpaSide = {
    reported: '',
    actual: '',
    mark: {
      type: 'binary',
      availableMarks: 0.5,
      awardedMarks: '',
    },
  };
  this.cpaPos = {
    reported: '',
    actual: {
      relPosition: '',
      relValue: '',
    },
    mark: {
      type: 'binary',
      availableMarks: 0.5,
      awardedMarks: '',
    },
  };
  this.tcpa = {
    reported: '',
    actual: '',
    mark: {
      type: 'margin',
      availableMarks: 1,
      moe: 3,
      awardedMarks: '',
    },
  };
  this.rules = {
    reported: '',
    actual: '',
    mark: {
      type: 'compare',
      marksPerRule: 1,
      availableMarks: '',
      correctList: '',
      awardedMarks: '',
    },
  };
  this.completed;
}

// Function for form navigation

const nextPrev = function (n) {
  let x = $('.tab');
  // Hide the current tab:
  $(x[currentTab]).hide();
  // Increase decrease the current tab by 1:
  currentTab = currentTab + n;
  updateContactReports();
  showTab(currentTab);
};

const startAgain = function () {
  // Clear selectedRules
  selectedRules = [];
  // Reset form
  $('#regForm')[0].reset();
  // Clear rules selections
  $('.checkbox').prop('checked', false);
  var x = document.getElementsByClassName('tab');
  // Hide the current tab:
  x[currentTab].style.display = 'none';
  currentTab = 0;
  showTab(currentTab);
};

const nextContact = function () {
  // Get all checked rules
  $('.checkbox').each(function () {
    if ($(this).is(':checked')) {
      selectedRules.push($(this).attr('id'));
    }
  });
  const currentReport = contactReports.length - 1;
  contactReports[currentReport].completed = Date.now();
  completedRepsNo.push(contactReports[currentReport].tgtNo);
  // Validation
  // Generate array tgt names that have not been reported yet
  const shipsAfloatNames = window.shipsAfloat.slice(1).map((ship) => ship.name);
  const array = shipsAfloatNames.filter(
    (ship) => !completedRepsNo.includes(ship)
  );
  if (array.length > 0) {
    // Reset form
    $('#regForm')[0].reset();
    // Clear rule selections
    $('.checkbox').prop('checked', false);
    // Add rules to report object
    // Add rules
    contactReports[currentReport].rules.reported = selectedRules;
    // Clear selectedRules
    selectedRules = [];
    // Hide the current tab:
    var x = $('.tab');
    $(x[currentTab]).hide();
    currentTab = 0;
    showTab(currentTab);
    updateTgtList();
  } else window.alert('All contacts have been reported, click intentions');
};

const intentions = function () {
  // Get all checked rules
  $('.checkbox').each(function () {
    if ($(this).is(':checked')) {
      selectedRules.push($(this).attr('id'));
    }
  });
  // Record current contact information
  const currentReport = contactReports.length - 1;
  contactReports[currentReport].completed = Date.now();
  completedRepsNo.push(contactReports[currentReport].tgtNo);
  // Add rules
  contactReports[currentReport].rules.reported = selectedRules;
  // Clear selectedRules
  selectedRules = [];
  const x = document.getElementsByClassName('tab');
  completedRepsNo.push(contactReports[currentReport].tgtNo);
  nextPrev(1);
};

const submitRep = function () {
  intentionsHandler();
  // Change visible elements
  // This function will figure out which tab to display
  var x = document.getElementsByClassName('tab');
  // Hide the current tab:
  x[currentTab].style.display = 'none';
  //Other elements
  $('#submit-message').fadeIn();
  $('#form-btns').toggle();
  $('#form-circles').toggle();
  completeReport(intentionsArr);
};

function fixStepIndicator(n) {
  $('.step').removeClass('active');
  $('.step').eq(n).addClass('active');
}

//Function triggered after user clicks next

function updateContactReports() {
  // On first tab create contact report and add tgt name
  if (currentTab == 1)
    contactReports.push(new contactReport($('#tgtSelector').val()));
  const currentReport = contactReports.length - 1;
  // Clone shipsAfloat
  reportShipsAfloat = cloneDeep(window.shipsAfloat);
  // Clone current details for contact
  let realContDetails = reportShipsAfloat.find(
    (el) => el.name == $('#tgtSelector').val()
  );
  // Add real data to contact report object for comparison later
  // Rel Colour
  contactReports[currentReport].relColour.actual =
    calcRelColour(realContDetails);
  // Rel Bearing
  if (realContDetails.USNRelFrmOwnShp < 180)
    contactReports[currentReport].relBearing.actual =
      realContDetails.USNRelFrmOwnShp;
  else
    contactReports[currentReport].relBearing.actual =
      360 - realContDetails.USNRelFrmOwnShp;
  // Range
  contactReports[currentReport].range.actual = realContDetails.range.toFixed(2);
  //Type
  if (params.resVis)
    contactReports[currentReport].type.actual = realContDetails.typeSound;
  else contactReports[currentReport].type.actual = realContDetails.type;
  // Held by
  if (params.resVis || contactReports[currentReport].range.actual > 11)
    contactReports[currentReport].held.actual.visual = false;
  else contactReports[currentReport].held.actual.visual = true;
  contactReports[currentReport].held.actual.radar = true;
  //Rel Bearing from contact
  if (realContDetails.USNRel < 180)
    contactReports[currentReport].aspectBearing.actual = realContDetails.USNRel;
  else
    contactReports[currentReport].aspectBearing.actual =
      360 - realContDetails.USNRel;
  //Rel aspect of contact
  contactReports[currentReport].aspectSide.actual = calcAspect(
    realContDetails.USNRel
  );
  //Bearing Movement
  contactReports[currentReport].bearingDirection.actual.direction =
    bearingChange(realContDetails);
  //CPA
  contactReports[currentReport].cpa.actual =
    realContDetails.cpaMiles.toFixed(1);
  //CPA side
  contactReports[currentReport].cpaSide.actual = calcCPAside(realContDetails);
  //CPA position
  contactReports[currentReport].cpaPos.actual.relPosition =
    calcCPAPos(realContDetails);
  contactReports[currentReport].cpaPos.actual.relValue =
    realContDetails.USNRelAtCPA.toFixed(2);
  //TCPA
  contactReports[currentReport].tcpa.actual = realContDetails.tcpa.toFixed(1);
  //Rules
  contactReports[currentReport].rules.actual = realContDetails.rules;

  // On second tab add report details
  if (currentTab == 2) {
    const currentReport = contactReports.length - 1;
    contactReports[currentReport].relColour.reported = $('#relColour').val();
    contactReports[currentReport].relBearing.reported = $('#relBearing').val();
    contactReports[currentReport].range.reported = $('#range').val();
    if (params.resVis)
      contactReports[currentReport].type.reported = $('#type-resvis').val();
    else contactReports[currentReport].type.reported = $('#type-vis').val();
    contactReports[currentReport].held.reported.visual =
      $('#visual').is(':checked');
    contactReports[currentReport].held.reported.radar =
      $('#radar-box').is(':checked');
    // contactReports[currentReport].held.reported.AIS = $('#AIS').is(":checked");
    contactReports[currentReport].aspectBearing.reported =
      $('#aspectBearing').val();
    contactReports[currentReport].aspectSide.reported = $('#aspectSide').val();
    // contactReports[currentReport].bearingMoveSpeed.reported = $('#bearingMoveSpeed').val();
    contactReports[currentReport].bearingDirection.reported =
      $('#bearingDirection').val();
    contactReports[currentReport].cpa.reported = $('#cpa').val();
    contactReports[currentReport].cpaSide.reported = $('#cpaSide').val();
    contactReports[currentReport].cpaPos.reported = $('#cpaPos').val();
    contactReports[currentReport].tcpa.reported = $('#tcpa').val();
  }
}

function showTab() {
  // This function will display the specified tab of the form...
  let n = currentTab;
  var x = $('.tab');
  x.eq(n).show();
  $('#nextBtn').show();
  //... and fix the Start Again/Next buttons:
  if (n == 0 || n == 4) {
    $('#resetBtn').hide();
  } else {
    $('#resetBtn').show();
  }
  if (n == x.length - 2) {
    document.getElementById('nextBtn').innerHTML = 'Next Contact';
    $('#nextBtn').hide();
    $('#nextCnt,#actionBtn').show();
    // $('#nextBtn').first().after('<button type="button" id="actionBtn">Actions</button>')
  } else {
    $('#nextBtn').html('Next');
    $('#nextCnt,#actionBtn').hide();
  }
  if (n == x.length - 1) {
    document.getElementById('nextBtn').innerHTML = 'Next Contact';
    $('#nextBtn,#nextCnt,#actionBtn').hide();
    $('#submitBtn').show();
  } else {
    $('#submitBtn').hide();
  }
  //... and run a function that will display the correct step indicator:
  fixStepIndicator(n);
}

const intentionsHandler = function () {
  // Get variables
  const turnDirection = $('#alterCrse').val();
  const turnAmount = $('#crseChange').val();
  const speedDirection = $('#alterSpeed').val();
  const speedAmount = $('#speedChange').val();

  // Alter own ship based on actions to get resultant CPA and TCPA
  //Course
  if (turnAmount > 0 && turnDirection != 'maintain') {
    // Convert to radians
    const radians = turnAmount * (Math.PI / 180);
    // Adjust own ship course
    if (turnDirection == 'port') reportShipsAfloat[0].course -= radians;
    if (turnDirection == 'starboard') reportShipsAfloat[0].course += radians;
    // Adjust own ship vec end
    const vecLength = Calculate.vecLengthInPixels(
      reportShipsAfloat[0].speed,
      params.shipVctrLngth,
      params.onemile
    );
    const endX =
      Math.cos(reportShipsAfloat[0].course) * vecLength +
      reportShipsAfloat[0].position.x;
    const endY =
      Math.sin(reportShipsAfloat[0].course) * vecLength +
      reportShipsAfloat[0].position.y;
    reportShipsAfloat[0].vecEnd = new Point(endX, endY);
    reportShipsAfloat[0].vector = reportShipsAfloat[0].vecEnd.subtract(
      reportShipsAfloat[0].position
    );
    //Update CPAs
    for (var i = 0; i < reportShipsAfloat.length; i++) {
      var ship = reportShipsAfloat[i];
      if (ship.constructor.name == 'Ship') {
        Calculate.CPA(
          ship,
          reportShipsAfloat[0],
          params.shipVctrLngth,
          params.onemile
        );
      }
    }
  }
  //Speed
  if (speedAmount > 0 && speedDirection != 'maintain') {
    // Adjust own ship course
    if (speedDirection == 'increase') reportShipsAfloat[0].speed += speedAmount;
    if (speedDirection == 'decrease') reportShipsAfloat[0].speed -= speedAmount;

    // Adjust own ship vec end
    const vecLength = Calculate.vecLengthInPixels(
      reportShipsAfloat[0].speed,
      params.shipVctrLngth,
      params.onemile
    );
    const endX =
      Math.cos(reportShipsAfloat[0].course) * vecLength +
      reportShipsAfloat[0].position.x;
    const endY =
      Math.sin(reportShipsAfloat[0].course) * vecLength +
      reportShipsAfloat[0].position.y;
    reportShipsAfloat[0].vecEnd = new Point(endX, endY);
    reportShipsAfloat[0].vector = reportShipsAfloat[0].vecEnd.subtract(
      reportShipsAfloat[0].position
    );

    //Update CPAs
    for (var i = 0; i < reportShipsAfloat.length; i++) {
      var ship = reportShipsAfloat[i];
      if (ship.constructor.name == 'Ship') {
        Calculate.CPA(
          ship,
          reportShipsAfloat[0],
          params.shipVctrLngth,
          params.onemile
        );
      }
    }
  }

  // Add intentions to array ++
  const intObj = {
    created: Date.now(),
    turn: {
      direction: $('#alterCrse').val(),
      amount: $('#crseChange').val(),
    },
    speed: {
      direction: $('#alterSpeed').val(),
      amount: $('#speedChange').val(),
    },
    rereports: handelMultiEls(reReportsArr),
    pnct: handelMultiEls(pnctArr),
    reportShipsAfloat: reportShipsAfloat,
    notes: {
      positive: [],
      warning: [],
      error: [],
      reportDetails: [],
    },
  };
  // Add intentions to array ++
  intentionsArr.push(intObj);
};

function handelMultiEls(inputArr) {
  const array = [];
  inputArr.forEach((el) => {
    array.push({
      tgtNo: $(`#${el}`).val(),
      range: $(`#${el}`).next().val(),
    });
  });
  return array;
}
// Functions for calculating 'actual' report values

function calcCPAside(ship) {
  const relBrng = ship.USNRelAtCPA;
  switch (true) {
    case relBrng >= 5 && relBrng < 175:
      return 'stb';
    case relBrng <= 355 && relBrng > 185:
      return 'port';
    case (relBrng > 355 && relBrng < 360) ||
      (relBrng > 0 && relBrng < 5) ||
      (relBrng >= 175 && relBrng <= 185):
      return '-- blank --';
  }
}

function calcRelColour(ship) {
  const relBrng = ship.USNRelFrmOwnShp;
  switch (true) {
    case relBrng >= 358 || relBrng <= 2:
      return "ship's head";
    case relBrng >= 178 && relBrng <= 182:
      return 'astern';
    case relBrng < 358 && relBrng > 182:
      return 'red';
    case relBrng > 2 && relBrng < 178:
      return 'green';
  }
}

function calcAspect(relBrng) {
  switch (true) {
    case relBrng >= 358 || relBrng <= 2:
      return "ship's head";
    case relBrng >= 178 && relBrng <= 182:
      return 'stern';
    case relBrng < 358 && relBrng > 182:
      return 'port';
    case relBrng > 2 && relBrng < 178:
      return 'stb';
  }
}

function calcCPAPos(ship) {
  const relBrng = ship.USNRelAtCPA;
  switch (true) {
    case (relBrng > 355 && relBrng < 360) || (relBrng > 0 && relBrng < 5):
      return "ship's head";
    case (relBrng > 275 && relBrng <= 355) || (relBrng >= 5 && relBrng < 85):
      return 'bow';
    case (relBrng > 265 && relBrng <= 275) || (relBrng >= 85 && relBrng < 95):
      return 'beam';
    case (relBrng > 185 && relBrng <= 265) || (relBrng >= 95 && relBrng < 175):
      return 'quarter';
    case relBrng >= 175 && relBrng <= 185:
      return 'stern';
  }
}

function bearingChange(shipAtReport) {
  let diffBrngs = shipAtReport.bearings.map(function (el, i, array) {
    return array[i + 1] - el;
  });
  // Deal with case when bearings go between -180 and +180
  // Remove if absolute difference is greater than 350
  diffBrngs = diffBrngs.filter((el) => !(Math.abs(el) > 350));
  //Remove NaN
  diffBrngs = diffBrngs.filter((el) => !Number.isNaN(el));
  const sum = diffBrngs.reduce((accumulator, value) => {
    return accumulator + value;
  }, 0);

  const mean = sum / diffBrngs.length;
  // Convert mean to degrees per minute
  const degMin = mean * 120;
  // Record rate of bearing movement
  const currentReport = contactReports.length - 1;
  contactReports[currentReport].bearingDirection.actual.rate = Math.abs(
    degMin.toFixed(2)
  );
  if (Math.abs(degMin) < 0.5) return 'steady';
  else if (degMin < 0) return 'left';
  else if (degMin > 0) return 'right';
}

// Function for keep track of which contacts have been reported and updating TGT selector options

const updateTgtList = function () {
  // Generate array of ships names from ships afloat
  const shipsAfloatNames = window.shipsAfloat.slice(1).map((ship) => ship.name);
  // Generate array tgt names that have not been reported yet
  const array = shipsAfloatNames.filter(
    (ship) => !completedRepsNo.includes(ship)
  );
  // Empty element
  $('#tgtSelector').empty();
  //Build new list
  array.forEach((tgtNo) =>
    $('#tgtSelector').append(`<option value="${tgtNo}">${tgtNo}</option>`)
  );
};

// Jquery code to run after document ready

$(function () {
  //Drop Down Effect
  $('.expand').on('click', function () {
    $(this).next().slideToggle();
    $(this).toggleClass('active');
  });

  // Dynamic controls for forms

  // Intentions

  // Hide elements by default
  $('#crseChangeGroup').hide();
  $('#spdChangeGroup').hide();

  $('#alterCrse').on('change', function () {
    if ($(this).val() == 'port' || $(this).val() == 'starboard')
      $('#crseChangeGroup').show();
    else $('#crseChangeGroup').hide();
  });
  $('#alterSpeed').on('change', function () {
    if ($(this).val() == 'increase' || $(this).val() == 'decrease')
      $('#spdChangeGroup').show();
    else $('#spdChangeGroup').hide();
  });

  $('#addRereport').on('click', function () {
    //Create options list
    let options = '';
    const id = 'reReport-' + Date.now();
    reReportsArr.push(id);
    completedRepsNo.forEach(
      (el) => (options += `<option value='${el}'>${el}</option>`)
    );
    $('#Rereports').append(
      `<div class = "listEl-rr" data="${id}">Contact No. <select id= "${id}">${options}</select> at <input type="number" min = "0" step = "0.1" placeholder = "1.0"> NM <span class="removeEl">x</span> </div>`
    );
  });

  $('#addAgreement').on('click', function () {
    //Create options list
    let options = '';
    const id = 'agreement-' + Date.now();
    pnctArr.push(id);
    completedRepsNo.forEach(
      (el) => (options += `<option value='${el}'>${el}</option>`)
    );
    $('#agreements').append(
      `<div class = "listEl-ncl" data="${id}">Contact No. <select id= "${id}">${options}</select> no closer than <input type="number" min = "0" step = "0.1" placeholder = "1.0"> NM <span class="removeEl">x</span></div>`
    );
  });

  // Contact report form

  // Relative colour
  $('#relColour').on('change', () => {
    if (
      $('#relColour').val() === "ship's head" ||
      $('#relColour').val() === 'astern'
    )
      $('#relBearingCont').hide();
    else $('#relBearingCont').show();
  });
  // Aspect from other ship
  $('#aspectSide').on('change', () => {
    if (
      $('#aspectSide').val() === "ship's head" ||
      $('#aspectSide').val() === 'stern'
    ) {
      $('#bow').hide();
      $('#aspectBearingCont').hide();
    } else {
      $('#aspectBearingCont').show();
      $('#bow').show();
    }
  });

  // Remove elements from Re-report or Pass No Closer Than list
  $(document).on('click', '.removeEl', function () {
    $(this).parent().remove();
    if ($(this).parent().attr('class') == 'listEl-rr') {
      const indexOfReport = reReportsArr.findIndex(
        (e) => e == $(this).parent().attr('data')
      );
      reReportsArr.splice(indexOfReport, 1);
    }
    if ($(this).parent().attr('class') == 'listEl-ncl') {
      const index = pnctArr.findIndex(
        (e) => e == $(this).parent().attr('data')
      );
      pnctArr.splice(index, 1);
    }
  });
});

const completeReport = function () {
  // The is where the final data gets sent to the API
  console.log(intentionsArr);
  console.log(contactReports);
  console.log(window.shipsAfloat);
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

export {
  updateTgtList,
  contactReports,
  intentionsArr,
  showTab,
  startAgain,
  nextPrev,
  nextContact,
  intentions,
  submitRep,
};
