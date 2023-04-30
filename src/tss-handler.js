// Functions for handling the TSS object.

export const updatePosition = function (newPosition, TSSObject) {
  TSSObject.trafficLanes.occupiedPosition = newPosition;
  // Update the position of the other traffic lane
  const deltaOtherTs = new Point(0, 0);
  deltaOtherTs.angle = TSSObject.orientation - 90; // PaperJS uses degrees
  deltaOtherTs.length = TSSObject.trafficLanes.width + TSSObject.sepZone.width;
  TSSObject.trafficLanes.otherPosition = newPosition.add(deltaOtherTs);
  // Update the position of the separation zone
  const deltaSepZone = new Point(0, 0);
  deltaSepZone.angle = TSSObject.orientation - 90; // PaperJS uses degrees
  deltaSepZone.length =
    TSSObject.trafficLanes.width / 2 + TSSObject.sepZone.width / 2;
  TSSObject.sepZone.position = newPosition.add(deltaSepZone);
};

export const updateScale = function (TSS, shipsAfloat, direction) {
  // Scale position
  const vecOCTLtoOS = TSS.trafficLanes.occupiedPosition.subtract(
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
  updatePosition(newPosition, TSS);
};
