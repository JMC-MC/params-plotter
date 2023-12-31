export function pixelsToMiles(pixels, onemile) {
  const distanceInMiles = pixels / onemile;
  return distanceInMiles;
}

export function MilesToPixels(miles, onemile) {
  const pixelsInMiles = Math.round(miles * onemile * 100) / 100;
  return pixelsInMiles;
}

export function vecAngleToCompassBrng(angle) {
  if (angle >= -90 && angle <= 180) return (angle += 90);
  else return (angle += 450);
}

export function brngToFourFigStrng(bearing) {
  var BrngAsString;
  // Add 0s when required
  if (bearing >= 100) return bearing;
  else if (bearing > 9) {
    BrngAsString = '0' + bearing;
    return BrngAsString;
  } else {
    BrngAsString = '00' + bearing;
    return BrngAsString;
  }
}

export function distanceToThreeCanvas(pos) {
  //Scale 12NM = 12000M
  var b = pos * 1000;
  return b;
}

export function NumbersInObject(obj) {
  for (let key in obj) {
    if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      NumbersInObject(obj[key]);
    } else if (!isNaN(obj[key])) {
      obj[key] = Number(obj[key]);
    }
  }
}

export function degToRad(deg) {
  return deg * (Math.PI / 180);
}

export function radToDeg(rad) {
  return rad * (180 / Math.PI);
}
