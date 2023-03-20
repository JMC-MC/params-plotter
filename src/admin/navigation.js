// When document is ready
$(function () {
  // Navigation
  $('#lookout-button').on('touchstart mousedown', function () {
    // Switch Screens
    $('#radar').hide();
    $('#lookOut').show();
    $('#rules-view').hide();
    $('#report-view').hide();
    $('#analysis-view').hide();
    $('#controls').hide();
    $('#debrief-view').hide();
  });

  $('#radar-button').on('touchstart mousedown', function () {
    // Switch Screens
    $('#radar').show();
    $('#lookOut').hide();
    $('#rules-view').hide();
    $('#report-view').hide();
    $('#analysis-view').hide();
    $('#debrief-view').hide();
  });
  $('#rules-button').on('touchstart mousedown', function () {
    // Switch Screens
    $('#radar').hide();
    $('#lookOut').hide();
    $('#rules-view').show();
    $('#analysis-view').hide();
    $('#debrief-view').hide();
  });

  $('#edit-button').on('touchstart mousedown', function () {
    // Switch Screens
    $('#radar').show();
    $('#lookOut').hide();
    $('#rules-view').hide();
    $('#analysis-view').hide();
    $('#ctrl-bar').show();
    $('#debrief-view').hide();
    updateTgtList();
  });

  $('#report-button').on('touchstart mousedown', function () {
    $('#myQuestion').show();
  });

  $('.close').on('touchstart mousedown', function () {
    $('#myQuestion').hide();
  });

  $('#back-button').on('touchstart mousedown', function () {
    // Switch Screens
    $('#radar').show();
    $('#lookOut').hide();
    $('#rules-view').hide();
    $('#analysis-view').hide();
    $('#ctrl-bar').hide();

    // Change nav options
    $('#rdrBttnCntr').show();
    $('#lkBttnCntr').show();
    $('#nxtBttnCntr').show();
    $('#bckBttnCntr').hide();
    $('#answrBttnCntr').hide();
    $('#edtBttnCntr').hide();
    // Start animation
    window.play = true;
    if (status == 'waiting') {
      status = 'start';
      if (window.play === true) {
        console.log(window);
        console.log('playing');
      } else {
        console.log('paused');
        $('.controls').text('paused');
      }
    }
  });

  $('#next-button').on('touchstart mousedown', function () {
    // Switch Screens
    $('#radar').hide();
    $('#lookOut').hide();
    $('#rules-view').hide();
    $('#analysis-view').show();
    // Change nav options
    $('#rdrBttnCntr').hide();
    $('#lkBttnCntr').hide();
    $('#nxtBttnCntr').hide();
    $('#bckBttnCntr').show();
    $('#answrBttnCntr').show();
    $('#edtBttnCntr').show();

    status = 'waiting';
  });

  $(document).on('mousedown', '.rule-link', function () {
    // Switch Screens
    $('#radar').hide();
    $('#lookOut').hide();
    $('#rules-view').show();
    $('#controls').hide();
    $('#analysis-view').hide();
    const rule = $(this).attr('at');
    $([document.documentElement, document.body]).animate(
      {
        scrollTop: $('#' + rule).offset().top - 100,
      },
      2000
    );
  });
});
