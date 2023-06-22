import * as TSSHandler from './utils/tss-handler.js';
import * as NCHandler from './utils/nc-handler.js';
import * as Draw from './radar/drawPaperElements.js';
import * as Calculate from './utils/calculators.js';
import * as Convert from './utils/converters.js';

export function updateShips(delta, params, shipsAfloat, TSS, NC) {
  const deltaSecs = delta / 1000;
  if (params.play == true) {
    Draw.radarRings(project, params.centX, params.centY, params.onemile);
    // Update TSS
    if (TSS) {
      const OSvecInSec = shipsAfloat[0].vector.length * 60;
      const factor = deltaSecs / OSvecInSec;
      let moveVector = shipsAfloat[0].vector.multiply(factor);
      moveVector.angle = shipsAfloat[0].vector.angle - 180;
      const newPosition = TSS.trafficLanes.occupied.position.add(moveVector);
      TSSHandler.updatePositionOccupied(newPosition, TSS);
      Draw.TSS(TSS);
    }
    // Update Narrow Channel
    if (NC) {
      const OSvecInSec = shipsAfloat[0].vector.length * 60;
      const factor = deltaSecs / OSvecInSec;
      let moveVector = shipsAfloat[0].vector.multiply(factor);
      moveVector.angle = shipsAfloat[0].vector.angle - 180;
      const newPosition = NC.lanes.occupied.position.add(moveVector);
      NCHandler.updatePositionOccupied(newPosition, NC);
      NC.markers.relPositionsPort = NCHandler.updateMarkerRelPositions(
        NC.markers.portMarkers,
        shipsAfloat[0].position,
        params.onemile
      );
      NC.markers.relPositionsStarboard = NCHandler.updateMarkerRelPositions(
        NC.markers.starboardMarkers,
        shipsAfloat[0].position,
        params.onemile
      );
      Draw.narrowChannel(NC, params.onemile, params.centX, params.centY);
    }
    Draw.ship(shipsAfloat[0], params.shipVctrLngth, params.onemile);
    for (var i = 0; i < shipsAfloat.length; i++) {
      var ship = shipsAfloat[i];
      if (ship.type != 'Own Ship') {
        // ship.relVec describes the velocity over ShipVctrLength (time)
        // Find the fractions of event.delta/params.shipVctrLngth and reduce the rel vec by this factor.
        // params.shipVctrLngth in secs
        let SvecInSec = params.shipVctrLngth * 60;
        let factor = deltaSecs / SvecInSec;
        let moveVector = ship.relVec.multiply(factor);
        ship.position = ship.position.add(moveVector);
        ship.vecEnd = ship.vecEnd.add(moveVector);
        // Update rel position
        ship.vecOwnShip = ship.position.subtract(shipsAfloat[0].position);
        ship.OwnShipAngle = ship.vecOwnShip.angle;
        ship.relposXnm = Convert.pixelsToMiles(
          ship.vecOwnShip.x,
          params.onemile
        );
        ship.relposYnm = Convert.pixelsToMiles(
          ship.vecOwnShip.y,
          params.onemile
        );
        // Update USNRel
        ship.USNRel = updateUSNR(ship, shipsAfloat[0]);
        ship.USNRelFrmOwnShp = updateUSNRFrmOwnshp(ship, shipsAfloat[0]);
        Calculate.CPA(
          ship,
          shipsAfloat[0],
          params.shipVctrLngth,
          params.onemile
        );
        if ($('#radar').is(':visible'))
          Draw.ship(ship, params.shipVctrLngth, params.onemile);
      }
    }
  }
}

function updateUSNR(ship, ownship) {
  const vecOwnShip = ship.position.subtract(ownship.position);
  return Calculate.USNRel(
    Convert.vecAngleToCompassBrng(vecOwnShip.angle),
    Convert.vecAngleToCompassBrng(ship.vector.angle)
  );
}

function updateUSNRFrmOwnshp(ship, ownship) {
  const vecOwnShip = ownship.position.subtract(ship.position);
  return Calculate.USNRel(
    Convert.vecAngleToCompassBrng(vecOwnShip.angle),
    Convert.vecAngleToCompassBrng(ownship.vector.angle)
  );
}
