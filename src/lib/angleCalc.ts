export function getAngle(from: L.LatLng, to: L.LatLng) {
  const dx = to.lng - from.lng;
  const dy = to.lat - from.lat;
  const rad = Math.atan2(dy, dx);
  const deg = (rad * 180) / Math.PI;
  return deg;
}
