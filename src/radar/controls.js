import { TSS, NC, params, shipsAfloat } from '../app.js';
import * as Update from './updaters.js';

export function init() {
  updateScaleValue();

  // Adjust range/vectors function
  $('#minus-range, #minus-range-sec').click(function () {
    // Confirm request is within limits
    if (params.scale > 1.5) {
      // change scale and update number on info panel
      params.scale = params.scale / 2;
      updateScaleValue();
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
      updateScaleValue();
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
      Update.vecLen(direction, params, shipsAfloat);
      updateVecLengthValue();
    }
  });

  $('#plus-vec, #plus-vec-sec').click(function () {
    // Confirm request is within limits
    if (params.shipVctrLngth < 48) {
      // Call function to update canvas
      const direction = 'plus';
      Update.vecLen(direction, params, shipsAfloat);
      updateVecLengthValue();
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

export function updateScaleValue() {
  $('#range-scale, #range-scale-sec').text(params.scale);
}
export function updateVecLengthValue() {
  $('#vec-length, #vec-length-sec').text(params.shipVctrLngth);
}

//Clear selected in all ships
export function clearSelectedShip() {
  for (var i = 0; i < shipsAfloat.length; i++) {
    shipsAfloat[i].posSelected = false;
    shipsAfloat[i].vecSelected = false;
  }
}

//Clear target selected in all ships
export function clearTargetSelected() {
  for (var i = 0; i < shipsAfloat.length; i++) {
    shipsAfloat[i].targetSelected = false;
  }
}

//Clear edit selected in all ships
export function clearEditSelected() {
  for (var i = 0; i < shipsAfloat.length; i++) {
    shipsAfloat[i].editSelected = false;
  }
}
