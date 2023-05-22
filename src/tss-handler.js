// Functions for handling the TSS object.
export const updatePositionsDelta = function (moveVector, TSSObject) {
  // This function updates the positions of the TSS object by a delta vector.
  // Update the positions of the occupied traffic lane
  TSSObject.trafficLanes.occupied.position =
    TSSObject.trafficLanes.occupied.position.add(moveVector);
  TSSObject.trafficLanes.occupied.corners.array.forEach((corner) => {
    corner = corner.add(moveVector);
  });
  // Update the positions of the other traffic lane
  TSSObject.trafficLanes.other.position =
    TSSObject.trafficLanes.other.position.add(moveVector);
  TSSObject.trafficLanes.other.corners.forEach((corner) => {
    corner = corner.add(moveVector);
  });
  // Update the positions of the separation zone
  TSSObject.sepZone.position = TSSObject.sepZone.position.add(moveVector);
  TSSObject.sepZone.corners.forEach((corner) => {
    corner = corner.add(moveVector);
  });
};

export const updateCorners = function (newLength, newWidth, TSSObject) {
  // Update the corners of the occupied traffic lane
  TSSObject.trafficLanes.occupied.corners = getRectangleCorners(
    TSSObject.trafficLanes.occupied.position,
    newLength,
    newWidth,
    TSSObject.orientation
  );
  // Update the corners of the other traffic lane
  TSSObject.trafficLanes.other.corners = getRectangleCorners(
    TSSObject.trafficLanes.other.position,
    newLength,
    newWidth,
    TSSObject.orientation
  );
  // Update the corners of the separation zone
  TSSObject.sepZone.corners = getRectangleCorners(
    TSSObject.sepZone.position,
    newLength,
    newWidth,
    TSSObject.orientation
  );
};

export const updatePositionOccupied = function (newPosition, TSSObject) {
  // This function updates the position of all elements of the TSS based on a new position for the occupied traffic lane.
  TSSObject.trafficLanes.occupied.position = newPosition;
  TSSObject.trafficLanes.occupied.corners = getRectangleCorners(
    TSSObject.trafficLanes.occupied.position,
    TSSObject.length,
    TSSObject.trafficLanes.width,
    TSSObject.orientation
  );
  // Update the position of the other traffic lane
  const deltaOtherTs = new Point(0, 0);
  deltaOtherTs.angle = TSSObject.orientation - 90; // PaperJS uses degrees
  deltaOtherTs.length = TSSObject.trafficLanes.width + TSSObject.sepZone.width;
  TSSObject.trafficLanes.other.position = newPosition.add(deltaOtherTs);
  TSSObject.trafficLanes.other.corners = getRectangleCorners(
    TSSObject.trafficLanes.other.position,
    TSSObject.length,
    TSSObject.trafficLanes.width,
    TSSObject.orientation
  );
  // Update the position of the separation zone
  const deltaSepZone = new Point(0, 0);
  deltaSepZone.angle = TSSObject.orientation - 90; // PaperJS uses degrees
  deltaSepZone.length =
    TSSObject.trafficLanes.width / 2 + TSSObject.sepZone.width / 2;
  TSSObject.sepZone.position = newPosition.add(deltaSepZone);
  TSSObject.sepZone.corners = getRectangleCorners(
    TSSObject.sepZone.position,
    TSSObject.length,
    TSSObject.sepZone.width,
    TSSObject.orientation
  );
};

export const updateScale = function (TSS, shipsAfloat, direction) {
  // Scale position
  const vecOCTLtoOS = TSS.trafficLanes.occupied.position.subtract(
    shipsAfloat[0].position
  );
  if (direction == 'minus') {
    //Scale position
    vecOCTLtoOS.length = vecOCTLtoOS.length * 2;
    // Scale dimensions
    TSS.trafficLanes.width = TSS.trafficLanes.width * 2;
    TSS.sepZone.width = TSS.sepZone.width * 2;
    TSS.length = TSS.length * 2;
  } else if (direction == 'plus') {
    // Scale position
    vecOCTLtoOS.length = vecOCTLtoOS.length / 2;
    // Scale dimensions
    TSS.trafficLanes.width = TSS.trafficLanes.width / 2;
    TSS.sepZone.width = TSS.sepZone.width / 2;
    TSS.length = TSS.length / 2;
  }
  const newPosition = shipsAfloat[0].position.add(vecOCTLtoOS);
  updatePositionOccupied(newPosition, TSS);
};

export function getRectangleCorners(center, length, width, angle) {
  const halfLength = length / 2;
  const halfWidth = width / 2;

  // Calculate the position vectors for half-length and half-width
  const halfLengthVector = new Point({
    length: halfLength,
    angle: angle,
  });

  const halfWidthVector = new Point({
    length: halfWidth,
    angle: angle + 90,
  });

  // Calculate the positions of the four corners
  const corner1 = center.add(halfLengthVector).add(halfWidthVector);
  const corner2 = center.subtract(halfLengthVector).add(halfWidthVector);
  const corner3 = center.subtract(halfLengthVector).subtract(halfWidthVector);
  const corner4 = center.add(halfLengthVector).subtract(halfWidthVector);

  return [corner1, corner2, corner3, corner4];
}
