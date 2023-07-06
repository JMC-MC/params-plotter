// When document is ready
export function initNavigation() {
  resetNavigation();
  $('#ctrl-bar').show();
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
}

export function resetNavigation() {
  $('#lookout-button').removeClass('activeclicked');
  $('#rules-button').removeClass('activeclicked');
  // Radar screen is active on load
  $('#radar-button').addClass('activeclicked'); // Make radar-button active on page load
  // Switch Screens
  $('#radar').css('visibility', 'visible');
  $('#lookOut').css('visibility', 'hidden');
  $('#rules-view').css('visibility', 'hidden');
}

function setActiveMenu(item) {
  $('.activeclicked').removeClass('activeclicked');
  $(item).addClass('activeclicked');
}
