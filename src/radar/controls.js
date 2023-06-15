export function init(scale, shipVctrLngth) {
  $('#range-scale, #range-scale-sec').text(scale);

  // Adjust range/vectors function
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
    if (shipVctrLngth > 3) {
      // Call function to update canvas
      const direction = 'minus';
      updateVecLen(direction);
      $('#vec-length, #vec-length-sec').text(shipVctrLngth);
    }
  });

  $('#plus-vec, #plus-vec-sec').click(function () {
    // Confirm request is within limits
    if (shipVctrLngth < 48) {
      // Call function to update canvas
      const direction = 'plus';
      updateVecLen(direction);
      $('#vec-length, #vec-length-sec').text(shipVctrLngth);
    }
  });

  // Accordion info panels
  //Toggle on load
  $('#ship').parent().find('.arrow').toggleClass('arrow-animate');

  $('.title').click(function () {
    // Only for use on medium and large screens
    if ($(window).width() > 601) {
      console.log($(this));
      $(this).parent().find('.arrow').toggleClass('arrow-animate');
      $(this).parent().find('.accordion').slideToggle(280);
    }
  });
}
