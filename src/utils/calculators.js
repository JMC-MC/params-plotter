import * as Convert from './converters.js';

// Calculate CPA from own ship
export function CPA(ship, ownship, shipVctrLngth, onemile) {
  // Is this a target ship?
  if (ship.type == 'Own Ship') return;
  else {
    var p3 = ship.position;
    var p4 = ship.vecEnd;
  }
  var p1 = ownship.position;
  var p2 = ownship.vecEnd;
  var Xa = (p2.x - p1.x) / shipVctrLngth;
  var Ya = (p2.y - p1.y) / shipVctrLngth;
  var Xb = (p4.x - p3.x) / shipVctrLngth;
  var Yb = (p4.y - p3.y) / shipVctrLngth;
  // TCPA
  const tcpa =
    (-(p1.y * Ya) +
      p3.y * Ya -
      Xb * p3.x -
      Xa * p1.x -
      Yb * p3.y +
      Xb * p1.x +
      Xa * p3.x +
      Yb * p1.y) /
    (Math.pow(Xb, 2) +
      Math.pow(Xa, 2) +
      Math.pow(Ya, 2) +
      Math.pow(Yb, 2) -
      2 * Xb * Xa -
      2 * Yb * Ya);
  // Assign to ship
  ship.tcpa = Math.round(tcpa * 10) / 10;
  // Declare more variables for distance formula
  var XaT = tcpa * ((p2.x - p1.x) / shipVctrLngth) + p1.x;
  var YaT = tcpa * ((p2.y - p1.y) / shipVctrLngth) + p1.y;
  var XbT = tcpa * ((p4.x - p3.x) / shipVctrLngth) + p3.x;
  var YbT = tcpa * ((p4.y - p3.y) / shipVctrLngth) + p3.y;
  //Position of target at CPA
  ship.posAtCPA = new Point([XbT, YbT]);
  ship.ownPosAtCPA = new Point([XaT, YaT]);
  ship.vecToCPA = ship.ownPosAtCPA.subtract(ship.posAtCPA);
  ship.USNRelAtCPA = USNRel(
    Convert.vecAngleToCompassBrng(ship.vecToCPA.angle),
    Convert.vecAngleToCompassBrng(ownship.vector.angle)
  );

  //Formula for calculating distance between two ships at tcpa
  const distance = Math.sqrt(Math.pow(XbT - XaT, 2) + Math.pow(YbT - YaT, 2));
  ship.cpaMiles = Convert.pixelsToMiles(distance, onemile);
  //Assign to ship
  ship.cpa = distance;
}

export function USNRel(bearing, course) {
  const x = recip(bearing) - course;
  if (x < 0) return x + 360;
  else return x;
}

export function vecLengthInPixels(speed, shipVctrLngth, onemile) {
  const miles = (speed / 60) * shipVctrLngth;
  const distanceInPixels = Convert.MilesToPixels(miles, onemile);
  return distanceInPixels;
}

export function speedInKts(vecLength, shipVctrLngth, onemile) {
  const distanceInMiles = Convert.pixelsToMiles(vecLength, onemile);
  const speed = distanceInMiles * (60 / shipVctrLngth);
  const roundedSpeed = Math.round(speed * 100) / 100;
  return roundedSpeed;
}
// Find reciprocal bearing
function recip(bearing) {
  if (bearing > 180) return bearing - 180;
  else return bearing + 180;
}

export function targetCourse(BearingOwnToT, AFTSHRads) {
  const targetCourse = reciprocal_bearing(BearingOwnToT) - AFTSHRads;
  const normalizedTargetCourse =
    targetCourse >= 0
      ? targetCourse % (2 * Math.PI)
      : (targetCourse % (2 * Math.PI)) + 2 * Math.PI;
  return normalizedTargetCourse;
}

function reciprocal_bearing(bearing) {
  return (bearing + Math.PI) % (2 * Math.PI);
}
