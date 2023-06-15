import * as Convert from '../utils/converters.js';
import * as Calculate from '../utils/calculators.js';
import { shipsAfloat } from '../app.js';

export function radarRings(project, centX, centY, onemile) {
  project.activeLayer.removeChildren();
  const rrScale = 3;
  const centre = [centX, centY];
  const rangeRings = new Group([
    new Path.Circle(centre, onemile * rrScale),
    new Path.Circle(centre, onemile * (rrScale * 2)),
    new Path.Circle(centre, onemile * (rrScale * 3)),
    new Path.Circle(centre, onemile * (rrScale * 4)),
    new Path.Circle(centre, onemile * (rrScale * 5)),
    new Path.Circle(centre, onemile * (rrScale * 6)),
    new Path.Circle(centre, onemile * (rrScale * 7)),
    new Path.Circle(centre, onemile * (rrScale * 8)),
    new Path.Circle(centre, onemile * (rrScale * 9)),
    new Path.Circle(centre, onemile * (rrScale * 10)),
    new Path.Circle(centre, onemile * (rrScale * 11)),
    new Path.Circle(centre, onemile * (rrScale * 12)),
    new Path.Circle(centre, onemile * (rrScale * 13)),
    new Path.Circle(centre, onemile * (rrScale * 14)),
  ]);
  rangeRings.strokeWidth = 1;
  rangeRings.strokeColor = '#282828';
}

export function narrowChannel(NC, onemile, centX, centY) {
  NC.paths = new Group();
  let channelMarkers = new Group();

  const markerSize = onemile / 4;

  const maxWidth = 3; // maximum width
  const maxHeight = 5; // maximum height

  NC.markers.portMarkers.forEach((marker) => {
    const vecToCent = new Point(centX, centY).subtract(marker);
    const distance = Convert.pixelsToMiles(vecToCent.length, onemile);
    const factor = markerSize * Math.exp(-distance);
    // Calculate width and height, ensure they don't exceed the maximum
    const width = Math.min(factor * 10, maxWidth);
    const height = Math.min(factor * 3, maxHeight);

    const rectSize = new Size(width, height);
    const topLeft = marker.subtract([rectSize.width / 2, rectSize.height / 2]);
    let newMarker = new Path.Rectangle(topLeft, rectSize);
    newMarker.rotate(vecToCent.angle + 90);
    newMarker.fillColor = '#FAC728';
    channelMarkers.addChild(newMarker);
  });

  NC.markers.starboardMarkers.forEach((marker) => {
    const vecToCent = new Point(centX, centY).subtract(marker);
    const distance = Convert.pixelsToMiles(vecToCent.length, onemile);
    const factor = markerSize * Math.exp(-distance);
    // Calculate width and height, ensure they don't exceed the maximum
    const width = Math.min(factor * 10, maxWidth);
    const height = Math.min(factor * 3, maxHeight);

    const rectSize = new Size(width, height);
    const topLeft = marker.subtract([rectSize.width / 2, rectSize.height / 2]);
    let newMarker = new Path.Rectangle(topLeft, rectSize);
    newMarker.rotate(vecToCent.angle + 90);
    newMarker.fillColor = '#FAC728';
    channelMarkers.addChild(newMarker);
  });

  NC.paths.addChildren([channelMarkers]);
}

export function ship(ship, shipVctrLngth, onemile) {
  ship.vector = ship.vecEnd.subtract(ship.position);
  ship.arrowVector = ship.vector.normalize(10);
  // Clear previous elements
  if (ship.vectorItem) {
    ship.vectorItem.remove();
  }
  if (ship.data) {
    ship.data.remove();
  }
  if (ship.relVecItem) {
    ship.relVecItem.remove();
  }
  if (ship.targetIndicator) {
    ship.targetIndicator.remove();
  }
  if (ship.editIndicator) {
    ship.editIndicator.remove();
  }

  // Draw elements for target
  if (ship.type != 'Own Ship') {
    // Calculate range & bearing
    const vecOwnShip = ship.position.subtract(shipsAfloat[0].position);
    ship.range = Convert.pixelsToMiles(Math.round(vecOwnShip.length), onemile);
    ship.bearing = Convert.brngToFourFigStrng(
      Convert.vecAngleToCompassBrng(Math.round(vecOwnShip.angle)),
      onemile
    );
    const textAngle =
      Math.abs(vecOwnShip.angle) > 90
        ? 180 + vecOwnShip.angle
        : vecOwnShip.angle;
    // Calculate a movement relative to ownShip
    ship.relVec = ship.vector.subtract(shipsAfloat[0].vector);
    ship.relVecEnd = ship.position.add(ship.relVec);
    // Make dimensions for arrow elements
    ship.relArrowVector = ship.relVec.normalize(10);
    // Ship information
    ship.relVecItem = new Group([
      new Path({
        segments: [[ship.position], [ship.relVecEnd]],
      }),
    ]);
    var limX = myCanvas.width / 2;
    var limY = myCanvas.height / 2;
    // Place tgt info
    if (ship.vector.angle < 0 && ship.vector.angle > -180)
      ship.labelPos = [ship.position.x - 10, ship.position.y + 20];
    else ship.labelPos = [ship.position.x - 10, ship.position.y - 10];

    if (ship.targetSelected & !ship.editSelected) {
      // If in edit mode, display arrows instead of box
      if (!($('#ctrl-bar').css('display') == 'none')) {
        ship.targetIndicator = new Group([
          new Path([
            ship.position.subtract([0, 20]),
            ship.position.subtract([0, 40]),
          ]),
          new Path.RegularPolygon(
            new Point(ship.position.subtract([0, 40])),
            3,
            5
          ),
          new Path([ship.position.add([0, 20]), ship.position.add([0, 40])]),
          new Path.RegularPolygon(
            new Point(ship.position.add([0, 40])),
            3,
            5
          ).rotate(180),
          new Path([ship.position.add([20, 0]), ship.position.add([40, 0])]),
          new Path.RegularPolygon(
            new Point(ship.position.add([40, 1])),
            3,
            5
          ).rotate(90),
          new Path([
            ship.position.subtract([20, 0]),
            ship.position.subtract([40, 0]),
          ]),
          new Path.RegularPolygon(
            new Point(ship.position.subtract([40, 0]).add([0, 1])),
            3,
            5
          ).rotate(270),
          new Path([
            ship.vecEnd.subtract([0, 10]),
            ship.vecEnd.subtract([0, 20]),
          ]),
          new Path.RegularPolygon(
            new Point(ship.vecEnd.subtract([0, 20])),
            3,
            5
          ),
          new Path([ship.vecEnd.add([0, 10]), ship.vecEnd.add([0, 20])]),
          new Path.RegularPolygon(
            new Point(ship.vecEnd.add([0, 20])),
            3,
            5
          ).rotate(180),
          new Path([ship.vecEnd.add([10, 0]), ship.vecEnd.add([20, 0])]),
          new Path.RegularPolygon(
            new Point(ship.vecEnd.add([20, 1])),
            3,
            5
          ).rotate(90),
          new Path([
            ship.vecEnd.subtract([10, 0]),
            ship.vecEnd.subtract([20, 0]),
          ]),
          new Path.RegularPolygon(
            new Point(ship.vecEnd.subtract([20, 0]).add([0, 1])),
            3,
            5
          ).rotate(270),
        ]);
      } else {
        const leftTopCorner = ship.position.subtract([30, 30]);
        const leftBottomCorner = ship.position.subtract([30, 0]).add([0, 30]);
        const rightTopCorner = ship.position.add([30, 0]).subtract([0, 30]);
        const rightBottomCorner = ship.position.add([30, 30]);
        ship.targetIndicator = new Group([
          new Path([
            leftTopCorner.subtract([1, 0]),
            leftTopCorner.add([10, 0]),
          ]),
          new Path([leftTopCorner, leftTopCorner.add([0, 10])]),
          new Path([
            leftBottomCorner.subtract([1, 0]),
            leftBottomCorner.add([10, 0]),
          ]),
          new Path([leftBottomCorner, leftBottomCorner.subtract([0, 10])]),
          new Path([
            rightTopCorner.add([1, 0]),
            rightTopCorner.subtract([10, 0]),
          ]),
          new Path([rightTopCorner, rightTopCorner.add([0, 10])]),
          new Path([
            rightBottomCorner.add([1, 0]),
            rightBottomCorner.subtract([10, 0]),
          ]),
          new Path([rightBottomCorner, rightBottomCorner.subtract([0, 10])]),
        ]);
      }
      ship.targetIndicator.strokeWidth = 1;
      ship.targetIndicator.strokeColor = 'white';
      $(document).ready(function () {
        $('#tgt-name').text('TARGET ' + ship.name);
        $('#ship-cog').text(
          Convert.brngToFourFigStrng(
            Convert.vecAngleToCompassBrng(Math.round(ship.vector.angle))
          )
        );
        $('#ship-sog').text(
          Calculate.speedInKts(
            ship.vector.length,
            shipVctrLngth,
            onemile
          ).toFixed(1)
        );
        $('#ship-brg').text(ship.bearing);
        $('#ship-rng, #ship-rng-sec').text(ship.range.toFixed(1));
        if (ship.cpa != NaN) {
          $('#ship-cpa, #ship-cpa-sec').text(
            Convert.pixelsToMiles(ship.cpa, onemile).toFixed(1)
          );
        } else {
          $('#ship-cpa, #ship-cpa-sec').text(ship.range).toFixed(1);
        }
        if (ship.tcpa) {
          $('#ship-tcpa, #ship-tcpa-sec').text(ship.tcpa.toFixed(1));
        }
      });
    }

    ship.data = new Group([
      new PointText({
        point: ship.labelPos,
        content: ship.name,
        fillColor: 'white',
        justification: 'left',
        fontSize: 10,
      }),
    ]);
    ship.relVecItem.strokeColor = 'grey';
    ship.relVecItem.strokeWidth = 1;
    ship.relVecItem.children[0].dashArray = [3, 2];
  }
  ship.vectorItem = new Group([
    new Path.Circle(ship.position, 6),
    new Path.Circle({ center: ship.position, radius: 3, fillColor: 'white' }),
    new Path({
      segments: [[ship.position], [ship.vecEnd]],
    }),
  ]);
  if (ship.editSelected) {
    ship.editIndicator = new Group([
      new Path([
        ship.position.subtract([0, 20]),
        ship.position.subtract([0, 40]),
      ]),
      new Path.RegularPolygon(new Point(ship.position.subtract([0, 40])), 3, 5),
      new Path([ship.position.add([0, 20]), ship.position.add([0, 40])]),
      new Path.RegularPolygon(
        new Point(ship.position.add([0, 40])),
        3,
        5
      ).rotate(180),
      new Path([ship.position.add([20, 0]), ship.position.add([40, 0])]),
      new Path.RegularPolygon(
        new Point(ship.position.add([40, 1])),
        3,
        5
      ).rotate(90),
      new Path([
        ship.position.subtract([20, 0]),
        ship.position.subtract([40, 0]),
      ]),
      new Path.RegularPolygon(
        new Point(ship.position.subtract([40, 0]).add([0, 1])),
        3,
        5
      ).rotate(270),
    ]);
    ship.editIndicator.strokeWidth = 1;
    ship.editIndicator.strokeColor = '#bf1a49';
    ship.editIndicator.fillColor = '#bf1a49';
  }
  if (ship.vecSelected) {
    ship.editIndicator = new Group([
      new Path([ship.vecEnd.subtract([0, 10]), ship.vecEnd.subtract([0, 20])]),
      new Path.RegularPolygon(new Point(ship.vecEnd.subtract([0, 20])), 3, 5),
      new Path([ship.vecEnd.add([0, 10]), ship.vecEnd.add([0, 20])]),
      new Path.RegularPolygon(new Point(ship.vecEnd.add([0, 20])), 3, 5).rotate(
        180
      ),
      new Path([ship.vecEnd.add([10, 0]), ship.vecEnd.add([20, 0])]),
      new Path.RegularPolygon(new Point(ship.vecEnd.add([20, 1])), 3, 5).rotate(
        90
      ),
      new Path([ship.vecEnd.subtract([10, 0]), ship.vecEnd.subtract([20, 0])]),
      new Path.RegularPolygon(
        new Point(ship.vecEnd.subtract([20, 0]).add([0, 1])),
        3,
        5
      ).rotate(270),
    ]);
    ship.editIndicator.strokeWidth = 1;
    ship.editIndicator.strokeColor = '#bf1a49';
    ship.editIndicator.fillColor = '#bf1a49';
  }

  //Style
  ship.vectorItem.strokeWidth = 1;
  if (ship.type == 'Own Ship') {
    ship.containerPos = [ship.position.x - 35, ship.position.y - 20];
    ship.vectorItem.strokeColor = '#1a9cbf';
    ship.vectorItem.children[1].fillColor = '#1a9cbf';
    $(document).ready(function () {
      $('#ownship-cog').text(
        Convert.brngToFourFigStrng(
          Convert.vecAngleToCompassBrng(Math.round(shipsAfloat[0].vector.angle))
        )
      );
      $('#ownship-sog').text(
        Calculate.speedInKts(
          shipsAfloat[0].vector.length,
          shipVctrLngth,
          onemile
        ).toFixed(1)
      );
      $('#height').text(myCanvas.height);
      $('#width').text(myCanvas.width);
    });
  } else ship.vectorItem.strokeColor = 'white';
}

export function TSS(TSS) {
  TSS.paths = new Group();

  const occupiedTrafficLaneBoundary = new Path.Line({
    from: TSS.trafficLanes.occupied.corners[0],
    to: TSS.trafficLanes.occupied.corners[1],
  });

  const otherTrafficLaneBoundary = new Path.Line({
    from: TSS.trafficLanes.other.corners[2],
    to: TSS.trafficLanes.other.corners[3],
  });

  const sepZonePath = new Path({
    segments: TSS.sepZone.corners,
    closed: true,
    fillColor: '#bf1a80',
    opacity: 0.75,
  });

  TSS.paths.addChildren([
    occupiedTrafficLaneBoundary,
    otherTrafficLaneBoundary,
    sepZonePath,
  ]);

  // Set the dash pattern, stroke color, and stroke width for the traffic lanes outer boundaries
  occupiedTrafficLaneBoundary.strokeWidth = 1;
  occupiedTrafficLaneBoundary.dashArray = [10, 5];
  occupiedTrafficLaneBoundary.strokeColor = '#bf1a80';

  otherTrafficLaneBoundary.strokeWidth = 1;
  otherTrafficLaneBoundary.dashArray = [10, 5];
  otherTrafficLaneBoundary.strokeColor = '#bf1a80';
}
