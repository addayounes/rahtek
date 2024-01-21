import { LatLng } from "../types/types";
import { distanceBetweenCoordinates } from "./distanceBetweenCoordinates";

export const coordinatesInsideCircle = (
  [lat, lng]: LatLng,
  circle: { center: LatLng; radius: number }
) => {
  const [circleLat, circleLng] = circle.center;

  const distanceOfPointFromCircleCenter = distanceBetweenCoordinates(
    [lat, lng],
    [circleLat, circleLng]
  );

  return distanceOfPointFromCircleCenter > circle.radius
    ? { result: false, distance: distanceOfPointFromCircleCenter }
    : { result: true, distance: distanceOfPointFromCircleCenter };
};
