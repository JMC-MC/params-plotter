import { bearingLogger } from '../utils/bearing-handler';
import { parameters } from './threeDisplay';
import { playAudio } from './audio';

export function initControls() {
  // Change view
  $('#zoom-view').on('touchstart mousedown', function () {
    parameters.zoomed = true;
    $('#zoom-view').addClass('view-selected');
    $('#eye-view').removeClass('view-selected');
    $('#compass-view').removeClass('view-selected');
    if ($('#compass-cont').is(':visible')) $('#compass-cont').toggle();
    if ($('#instrument-panel').is(':visible'));
    else $('#instrument-panel').toggle();
    $('#left-arrow i')
      .addClass('fa-duotone fa-chevrons-left')
      .removeClass('fa-regular fa-chevron-left');
    $('#right-arrow i')
      .addClass('fa-duotone fa-chevrons-right')
      .removeClass('fa-regular fa-chevron-right');
  });

  $('#eye-view').on('touchstart mousedown', function () {
    parameters.zoomed = false;
    $('#eye-view').addClass('view-selected');
    $('#zoom-view').removeClass('view-selected');
    $('#compass-view').removeClass('view-selected');
    if ($('#compass-cont').is(':visible')) $('#compass-cont').toggle();
    if ($('#instrument-panel').is(':visible'));
    else $('#instrument-panel').toggle();
    // Change arrows
    $('#left-arrow i')
      .addClass('fa-duotone fa-chevrons-left')
      .removeClass('fa-regular fa-chevron-left');
    $('#right-arrow i')
      .addClass('fa-duotone fa-chevrons-right')
      .removeClass('fa-regular fa-chevron-right');
  });

  $('#compass-view').on('touchstart mousedown', function () {
    parameters.zoomed = false;
    $('#eye-view').removeClass('view-selected');
    $('#zoom-view').removeClass('view-selected');
    $('#compass-view').addClass('view-selected');
    if ($('#compass-cont').is(':visible'));
    else $('#compass-cont').toggle();
    if ($('#instrument-panel').is(':visible')) $('#instrument-panel').toggle();
    bearingLogger(true);
    // Change arrows
    $('#left-arrow i')
      .addClass('fa-regular fa-chevron-left')
      .removeClass('fa-duotone fa-chevrons-left');
    $('#right-arrow i')
      .addClass('fa-regular fa-chevron-right')
      .removeClass('fa-duotone fa-chevrons-right');
  });

  // Camera Controls

  $('#left-arrow').on(
    'hover',
    function (e) {
      $(this).css('color', 'rgba(255, 255, 255, 1)');
    },
    function () {
      $(this).css('color', 'rgba(255, 255, 255, 0.75)');
    }
  );

  $('#left-arrow').on('touchstart mousedown', function (e) {
    e.preventDefault();
    if ($('#compass-cont').is(':visible')) {
      parameters.turnRate = 0.0009;
      bearingLogger();
    } else parameters.turnRate = 0.01;
    $(this).css('color', 'rgba(255, 255, 255, 1)');
  });

  $('#left-arrow').on('touchend mouseup', function (e) {
    e.preventDefault();
    parameters.turnRate = 0;
    $(this).css('color', 'rgba(255, 255, 255, 0.75)');
  });
  // Keys
  $(document).on('keydown', function (e) {
    if (e.which == 37) {
      if ($('#compass-cont').is(':visible')) {
        parameters.turnRate = 0.0009;
        bearingLogger();
      } else parameters.turnRate = 0.01;
    }
  });

  $(document).on('keyup', function (e) {
    if (e.which == 37) {
      parameters.turnRate = 0;
    }
  });

  $('#right-arrow').on(
    'hover',
    function (e) {
      $(this).css('color', 'rgba(255, 255, 255, 1)');
    },
    function () {
      $(this).css('color', 'rgba(255, 255, 255, 0.75)');
    }
  );

  $('#right-arrow').on('touchstart mousedown', function (e) {
    e.preventDefault();
    if ($('#compass-cont').is(':visible')) {
      parameters.turnRate = -0.0009;
      bearingLogger();
    } else parameters.turnRate = -0.01;
    $(this).css('color', 'rgba(255, 255, 255, 1)');
  });
  $('#right-arrow').on('touchend mouseup', function (e) {
    e.preventDefault();
    parameters.turnRate = 0;
    $(this).css('color', 'rgba(255, 255, 255, 0.75)');
  });

  // Keys
  $(document).on('keydown', function (e) {
    if (e.which == 39) {
      if ($('#compass-cont').is(':visible')) {
        parameters.turnRate = -0.0009;
        bearingLogger();
      } else parameters.turnRate = -0.01;
    }
  });

  $(document).on('keyup', function (e) {
    if (e.which == 39) {
      parameters.turnRate = 0;
    }
  });

  // Call for bearing logger and play audio
  $('#lookout-button').on('touchstart mousedown', function () {
    bearingLogger(); // Check if bearing is being taken. This is to capture occasions when the compass is left displayed and view is changed from and then back to look out.
    playAudio();
  });
}
