import * as TSSHandler from '../utils/tss-handler.js';
import * as NCHandler from '../utils/nc-handler.js';
import * as Draw from './drawPaperElements.js';
import * as Calculate from '../utils/calculators.js';

export function scale(direction, params, shipsAfloat, TSS, NC) {
  //Move ships on screen to reflect new scale
  // If reducing range scale
  if (direction == 'minus') {
    params.onemile += params.onemile;

    Draw.radarRings(project, params.centX, params.centY, params.onemile);
    if (TSS) {
      TSSHandler.updateScale(TSS, shipsAfloat, direction);
      Draw.TSS(TSS);
    }
    if (NC) {
      NCHandler.updateScale(
        NC,
        shipsAfloat,
        direction,
        new Point(params.centX, params.centY),
        params.onemile
      );
      Draw.narrowChannel(NC, params.onemile, params.centX, params.centY);
    }

    // Loop through every ship
    for (var i = 0; i < shipsAfloat.length; i++) {
      var ship = shipsAfloat[i];
      if (ship.type != 'Own Ship') {
        // Get vector to ownShip/centre
        const vecOwnShip = ship.position.subtract(shipsAfloat[0].position);
        ship.position = ship.position.add(vecOwnShip);
        ship.vecEnd = ship.vecEnd.add(vecOwnShip);
        ship.vecEnd = ship.vecEnd.add(ship.vector);
      }
      if (ship.type == 'Own Ship') {
        // Increase vector size by 2
        ship.vecEnd = ship.vecEnd.add(ship.vector);
      }
      Calculate.CPA(ship, shipsAfloat[0], params.shipVctrLngth, params.onemile);
      Draw.ship(ship, params.shipVctrLngth, params.onemile);
    }
  } else {
    params.onemile = params.onemile / 2;
    Draw.radarRings(project, params.centX, params.centY, params.onemile);
    if (TSS) {
      TSSHandler.updateScale(TSS, shipsAfloat, direction);
      Draw.TSS(TSS);
    }
    if (NC) {
      NCHandler.updateScale(
        NC,
        shipsAfloat,
        direction,
        new Point(params.centX, params.centY),
        params.onemile
      );
      Draw.narrowChannel(NC, params.onemile, params.centX, params.centY);
    }
    // Loop through every ship
    for (var i = 0; i < shipsAfloat.length; i++) {
      var ship = shipsAfloat[i];
      if (ship.type != 'Own Ship') {
        // Get vector to ownShip/centre
        const vecOwnShip = ship.position.subtract(shipsAfloat[0].position);
        ship.position = ship.position.subtract(vecOwnShip.divide(2));
        ship.vecEnd = ship.vecEnd.subtract(vecOwnShip.divide(2));
        ship.vecEnd = ship.vecEnd.subtract(ship.vector.divide(2));
      }
      if (ship.type == 'Own Ship') {
        // Half vector size.
        ship.vecEnd = ship.vecEnd.subtract(ship.vector.divide(2));
      }
      Calculate.CPA(ship, shipsAfloat[0], params.shipVctrLngth, params.onemile);
      Draw.ship(ship, params.shipVctrLngth, params.onemile);
    }
  }
}

export function vecLen(direction, params, shipsAfloat) {
  if (direction == 'minus') {
    params.shipVctrLngth = params.shipVctrLngth - params.shipVctrLngth / 2;
    // Loop through every ship
    for (var i = 0; i < shipsAfloat.length; i++) {
      var ship = shipsAfloat[i];
      // Adjust Vec End
      ship.vecEnd = ship.vecEnd.subtract(ship.vector.divide(2));
      Calculate.CPA(ship, shipsAfloat[0], params.shipVctrLngth, params.onemile);
      Draw.ship(ship, params.shipVctrLngth, params.onemile);
    }
  } else {
    params.shipVctrLngth = params.shipVctrLngth + params.shipVctrLngth;
    // Loop through every ship
    for (var i = 0; i < shipsAfloat.length; i++) {
      var ship = shipsAfloat[i];
      // Adjust Vec End
      ship.vecEnd = ship.vecEnd.add(ship.vector);
      Calculate.CPA(ship, shipsAfloat[0], params.shipVctrLngth, params.onemile);
      Draw.ship(ship, params.shipVctrLngth, params.onemile);
    }
  }
}
