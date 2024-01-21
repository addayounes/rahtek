import { LatLng } from "../types/types";

const toRadian = (degrees: number) => degrees * 0.017453292519943295;

export function distanceBetweenCoordinates(
  [lat1, lng1]: LatLng,
  [lat2, lng2]: LatLng
) {
  const EARTH_DIAMETER = 12742; // Km

  const latRadian1 = toRadian(lat1);
  const latRadian2 = toRadian(lat2);

  const latitudeDifference = latRadian2 - latRadian1;
  const longitudeDifference = toRadian(lng1) - toRadian(lng2);

  const a =
    Math.sin(latitudeDifference / 2) ** 2 +
    Math.cos(latRadian1) *
      Math.cos(latRadian2) *
      Math.sin(longitudeDifference / 2) ** 2;

  return EARTH_DIAMETER * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
