import { getRectangleCorners } from './tss-handler.js';
import * as Convert from './utils/converters.js';

// Functions for handling the NC object.
export const updatePositionsDelta = function (moveVector, NCObject) {
  // This function updates the positions of the NC object by a delta vector.
  // Update the positions of the occupied lane
  NCObject.lanes.occupied.position =
    NCObject.lanes.occupied.position.add(moveVector);
  NCObject.lanes.occupied.corners.array.forEach((corner) => {
    corner = corner.add(moveVector);
  });
  // Update the positions of the other lane
  NCObject.lanes.other.position = NCObject.lanes.other.position.add(moveVector);
  NCObject.lanes.other.corners.forEach((corner) => {
    corner = corner.add(moveVector);
  });
  // Update the positions of the separation zone
  NCObject.sepZone.position = NCObject.sepZone.position.add(moveVector);
  NCObject.sepZone.corners.forEach((corner) => {
    corner = corner.add(moveVector);
  });
};

export const updateCorners = function (newLength, newWidth, NCObject) {
  // Update the corners of the occupied lane
  NCObject.lanes.occupied.corners = getRectangleCorners(
    NCObject.lanes.occupied.position,
    newLength,
    newWidth,
    NCObject.orientation
  );
  // Update the corners of the other lane
  NCObject.lanes.other.corners = getRectangleCorners(
    NCObject.lanes.other.position,
    newLength,
    newWidth,
    NCObject.orientation
  );
  // Update the corners of the separation zone
  NCObject.sepZone.corners = getRectangleCorners(
    NCObject.sepZone.position,
    newLength,
    newWidth,
    NCObject.orientation
  );
  // Calculate distance between markers
  const adjustedSpacing = NCObject.length / markers.portMarkers.length - 2; // Remove 2 for the first and last marker.
  // Update markers
  NCObject.markers.portMarkers = updateMarkers(
    NCObject.lanes.other.corners[3],
    markers.portMarkers.length,
    adjustedSpacing,
    NCObject.orientation,
    NCObject.lanes.other.position
  );
};

export const updatePositionOccupied = function (newPosition, NCObject) {
  // This function updates the position of all elements of the NC based on a new position for the occupied lane.
  NCObject.lanes.occupied.position = newPosition;
  NCObject.lanes.occupied.corners = getRectangleCorners(
    NCObject.lanes.occupied.position,
    NCObject.length,
    NCObject.lanes.width,
    NCObject.orientation
  );
  // Update the position of the other lane
  const deltaOtherTs = new Point(0, 0);
  deltaOtherTs.angle = NCObject.orientation - 90; // PaperJS uses degrees
  deltaOtherTs.length = NCObject.lanes.width + NCObject.sepZone.width;
  NCObject.lanes.other.position = newPosition.add(deltaOtherTs);
  NCObject.lanes.other.corners = getRectangleCorners(
    NCObject.lanes.other.position,
    NCObject.length,
    NCObject.lanes.width,
    NCObject.orientation
  );
  // Update the position of the separation zone
  const deltaSepZone = new Point(0, 0);
  deltaSepZone.angle = NCObject.orientation - 90; // PaperJS uses degrees
  deltaSepZone.length = NCObject.lanes.width / 2 + NCObject.sepZone.width / 2;
  NCObject.sepZone.position = newPosition.add(deltaSepZone);
  NCObject.sepZone.corners = getRectangleCorners(
    NCObject.sepZone.position,
    NCObject.length,
    NCObject.sepZone.width,
    NCObject.orientation
  );
  // Calculate distance between markers
  const adjustedSpacing =
    NCObject.length / (NCObject.markers.portMarkers.length - 1);
  // Update markers
  NCObject.markers.portMarkers = updateMarkers(
    NCObject.markers.portMarkers.length,
    adjustedSpacing,
    NCObject.orientation,
    'other',
    NCObject.lanes.other.corners
  );
  NCObject.markers.starboardMarkers = updateMarkers(
    NCObject.markers.starboardMarkers.length,
    adjustedSpacing,
    NCObject.orientation,
    'occupied',
    NCObject.lanes.occupied.corners
  );
};

export const updateScale = function (
  NC,
  shipsAfloat,
  direction,
  screenCenter,
  oneMile
) {
  // Scale position
  const vecOCTLtoOS = NC.lanes.occupied.position.subtract(
    shipsAfloat[0].position
  );
  if (direction == 'minus') {
    //Scale position
    vecOCTLtoOS.length = vecOCTLtoOS.length * 2;
    // Scale dimensions
    NC.lanes.width = NC.lanes.width * 2;
    NC.sepZone.width = NC.sepZone.width * 2;
    NC.length = NC.length * 2;
  } else if (direction == 'plus') {
    // Scale position
    vecOCTLtoOS.length = vecOCTLtoOS.length / 2;
    // Scale dimensions
    NC.lanes.width = NC.lanes.width / 2;
    NC.sepZone.width = NC.sepZone.width / 2;
    NC.length = NC.length / 2;
  }
  const newPosition = shipsAfloat[0].position.add(vecOCTLtoOS);
  updatePositionOccupied(newPosition, NC, screenCenter, oneMile);
};

function updateMarkers(
  noPerSide,
  adjustedSpacing,
  orientation,
  laneType,
  corners
) {
  // Set starting corner for buoys based on lane type
  let cornerNumber;
  switch (laneType) {
    case 'other':
      cornerNumber = 2;
      break;
    case 'occupied':
      cornerNumber = 1;
      break;
  }
  const markers = [];
  const firstMarker = corners[cornerNumber];
  let moveVect = new Point(adjustedSpacing, 0);
  moveVect.angle = orientation;
  for (let i = 0; i < noPerSide; i++) {
    const position = firstMarker.add(moveVect.multiply(i));
    markers.push(position);
  }
  return markers;
}

export const updateMarkerRelPositions = function (
  markers,
  screenCenter,
  oneMile
) {
  // Update rel position
  const relPositions = [];
  markers.forEach((marker) => {
    relPositions.push(marker.subtract(screenCenter));
    // convert to miles
    relPositions[relPositions.length - 1].x = Convert.pixelsToMiles(
      relPositions[relPositions.length - 1].x,
      oneMile
    );
    relPositions[relPositions.length - 1].y = Convert.pixelsToMiles(
      relPositions[relPositions.length - 1].y,
      oneMile
    );
  });
  return relPositions;
};
