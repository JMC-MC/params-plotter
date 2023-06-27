// When document is ready
$(function () {
  // Radar screen is active on load
  $('#radar-button').addClass('activeclicked'); // Make radar-button active on page load
  // Switch Screens
  $('#radar').css('visibility', 'visible');
  $('#lookOut').css('visibility', 'hidden');
  $('#rules-view').css('visibility', 'hidden');

  // Navigation
  $('#lookout-button').on('touchstart mousedown', function () {
    setActiveMenu(this);
    // Switch Screens
    $('#radar').css('visibility', 'hidden');
    $('#lookOut').css('visibility', 'visible');
    $('#rules-view').css('visibility', 'hidden');
  });

  $('#radar-button').on('touchstart mousedown', function () {
    setActiveMenu(this);
    // Switch Screens
    $('#radar').css('visibility', 'visible');
    $('#lookOut').css('visibility', 'hidden');
    $('#rules-view').css('visibility', 'hidden');
  });

  $('#rules-button').on('touchstart mousedown', function () {
    setActiveMenu(this);
    // Switch Screens
    $('#radar').css('visibility', 'hidden');
    $('#lookOut').css('visibility', 'hidden');
    $('#rules-view').css('visibility', 'visible');
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
