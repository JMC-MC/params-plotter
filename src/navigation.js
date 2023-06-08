import {
  showTab,
  startAgain,
  nextPrev,
  nextContact,
  intentions,
  submitRep,
} from './report';
// When document is ready
$(function () {
  // Radar screen is active on load
  $('#radar-button').addClass('activeclicked'); // Make radar-button active on page load

  // Navigation
  $('#lookout-button').on('touchstart mousedown', function () {
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

    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('resize'));
    }, 100);
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
  $('#report-button').on('touchstart mousedown', function () {
    setActiveMenu(this);
    $('#myModal').show();
    showTab();
  });

  $('.close').on('touchstart mousedown', function () {
    $('#myModal').hide();
  });
  $('#resetBtn').on('mousedown touchstart', startAgain);

  $('#nextBtn').on('mousedown touchstart', function () {
    nextPrev(1);
  });
  $('#nextCnt').on('mousedown touchstart', nextContact);

  $('#actionBtn').on('mousedown touchstart', intentions);

  $('#submitBtn').on('mousedown touchstart', submitRep);

  function setActiveMenu(item) {
    $('.activeclicked').removeClass('activeclicked');
    $(item).addClass('activeclicked');
  }
});
