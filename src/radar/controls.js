import { TSS, NC, params, shipsAfloat } from '../app.js';
import * as Update from './updaters.js';

export function init() {
  $('#range-scale, #range-scale-sec').text(params.scale);

  // Adjust range/vectors function
  $('#minus-range, #minus-range-sec').click(function () {
    // Confirm request is within limits
    if (params.scale > 1.5) {
      // change scale and update number on info panel
      params.scale = params.scale / 2;
      $('#range-scale, #range-scale-sec').text(params.scale);
      // Call function to update canvas
      const direction = 'minus';
      Update.scale(direction, params, shipsAfloat, TSS, NC);
    }
  });

  $('#plus-range, #plus-range-sec').click(function () {
    // Confirm request is within limits
    if (params.scale < 48) {
      // change params.scale and update number on info panel
      params.scale = params.scale * 2;
      $('#range-scale, #range-scale-sec').text(params.scale);
      // Call function to update canvas
      const direction = 'plus';
      Update.scale(direction, params, shipsAfloat, TSS, NC);
    }
  });

  $('#minus-vec, #minus-vec-sec').click(function () {
    // Confirm request is within limits
    if (params.shipVctrLngth > 3) {
      // Call function to update canvas
      const direction = 'minus';
      updateVecLen(direction);
      $('#vec-length, #vec-length-sec').text(params.shipVctrLngth);
    }
  });

  $('#plus-vec, #plus-vec-sec').click(function () {
    // Confirm request is within limits
    if (params.shipVctrLngth < 48) {
      // Call function to update canvas
      const direction = 'plus';
      updateVecLen(direction);
      $('#vec-length, #vec-length-sec').text(params.shipVctrLngth);
    }
  });

  // Accordion info panels
  //Toggle on load
  $('#ship').parent().find('.arrow').toggleClass('arrow-animate');

  $('.title').click(function () {
    // Only for use on medium and large screens
    if ($(window).width() > 601) {
      $(this).parent().find('.arrow').toggleClass('arrow-animate');
      $(this).parent().find('.accordion').slideToggle(280);
    }
  });
}
