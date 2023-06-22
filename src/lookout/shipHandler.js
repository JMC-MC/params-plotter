// If ship over 11nm away make invisible
export function overHorizon(indexNo, shipObject, shipsAfloat) {
  if (shipsAfloat[indexNo].range > 11) shipObject.visible = false;
  else shipObject.visible = true;
}

// ShipsAfloat and Scene do not have the ships in the same order. Therefore match name to index.
export function nameToIndex(shipName, shipsAfloat) {
  return shipsAfloat.findIndex(function checkName(array) {
    return array.name == shipName;
  });
}
