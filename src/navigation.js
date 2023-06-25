import { reDrawRadar, clear } from './radar/canvas';
// When document is ready

$(function () {
  // Radar screen is active on load
  $('#radar-button').addClass('activeclicked'); // Make radar-button active on page load

  // Navigation
  $('#lookout-button').on('touchstart mousedown', function () {
    // clear();
    setActiveMenu(this);
    // Switch Screens
    $('#radar').hide();
    $('#lookOut').show();
    $('#rules-view').hide();
    $('#staff-answer').hide();
  });

  $('#radar-button').on('touchstart mousedown', function () {
    setActiveMenu(this);
    // Switch Screens
    $('#radar').show();
    $('#lookOut').hide();
    $('#rules-view').hide();
    $('#report-view').hide();
    $('#staff-answer').hide();
    setTimeout(function () {
      let myCanvas = document.getElementById('myCanvas');
      view.viewSize = new paper.Size(
        myCanvas.getBoundingClientRect().width,
        myCanvas.getBoundingClientRect().height
      );
      window.dispatchEvent(new CustomEvent('resize'));
    }, 1000);
  });

  $('#rules-button').on('touchstart mousedown', function () {
    setActiveMenu(this);
    // Switch Screens
    $('#radar').hide();
    $('#lookOut').hide();
    $('#rules-view').show();
    $('#staff-answer').hide();
  });

  $('#edit-button').on('touchstart mousedown', function () {
    setActiveMenu(this);
    // Switch Screens
    $('#radar').show();
    $('#lookOut').hide();
    $('#rules-view').hide();
    $('#analysis-view').hide();
    $('#ctrl-bar').show();
    $('#debrief-view').hide();
    updateTgtList();
  });

  // Report View
  $('#question-button').on('touchstart mousedown', function () {
    window.parent.postMessage(window.shipsAfloat, '*');
  });

  function setActiveMenu(item) {
    $('.activeclicked').removeClass('activeclicked');
    $(item).addClass('activeclicked');
  }
});
