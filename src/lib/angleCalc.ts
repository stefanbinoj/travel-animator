export function getAngle(from: L.LatLng, to: L.LatLng) {
  const dx = to.lng - from.lng;
  const dy = to.lat - from.lat;
  console.log(`dy : ${dy} || dx : ${dx}`);
  const rad = Math.atan2(dy, dx);
  console.log("rad : ", rad);
  const deg = (rad * 180) / Math.PI;
  console.log("deg : ", deg);

  return deg;
}
