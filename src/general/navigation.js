// When document is ready
$(function () {
  // Navigation
  $('#lookout-button').on('touchstart mousedown', function () {
    // Switch Screens
    $('#radar').hide();
    $('#lookOut').show();
    $('#rules-view').hide();
    $('#staff-answer').hide();
  });

  $('#radar-button').on('touchstart mousedown', function () {
    // Switch Screens
    $('#radar').show();
    $('#lookOut').hide();
    $('#rules-view').hide();
    $('#report-view').hide();
    $('#staff-answer').hide();
  });
  $('#rules-button').on('touchstart mousedown', function () {
    // Switch Screens
    $('#radar').hide();
    $('#lookOut').hide();
    $('#rules-view').show();
    $('#staff-answer').hide();
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
    console.log('fired');
    // Switch Screens
    $('#radar').hide();
    $('#lookOut').hide();
    $('#rules-view').hide();
    $('#staff-answer').show();
  });

  // JQuery Document ready
  $(document).on('mousedown', '.rule-link', function () {
    // Switch Screens
    $('#radar').hide();
    $('#lookOut').hide();
    $('#rules-view').show();
    $('#staff-answer').hide();
    const rule = $(this).attr('at');
    $([document.documentElement, document.body]).animate(
      {
        scrollTop: $('#' + rule).offset().top - 100,
      },
      2000
    );
  });
});
