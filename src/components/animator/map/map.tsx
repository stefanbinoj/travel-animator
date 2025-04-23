"use client";

import { useEffect, useRef } from "react";

export default function Map() {
  const mapRef = useRef(null);

  useEffect(() => {
    // dynamically import Leaflet and the routing plugin (avoids SSR errors)
    const L = require("leaflet");
    require("leaflet-routing-machine");

    const map = L.map(mapRef.current).setView([9.9312, 76.2673], 9);

    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        attribution: "Tiles &copy; Esri",
        maxZoom: 19,
      }
    ).addTo(map);

    // routing control with ≥2 waypoints
    const control = L.Routing.control({
      waypoints: [L.latLng(51.505, -0.09), L.latLng(51.51, -0.047)],
      router: L.Routing.osrmv1(),
      routeWhileDragging: true,
      createMarker: () => null, // we’ll add our own
    }).addTo(map);

    // allow users to click to add intermediate waypoints :contentReference[oaicite:2]{index=2}
    map.on("click", (e: any) => {
      const wps = control.getWaypoints();
      control.spliceWaypoints(wps.length - 1, 0, e.latlng);
    });

    // add a “vehicle” marker (emoji) and animate along the route
    const vehicleIcon = L.divIcon({
      html: "🚗",
      iconSize: [32, 32],
      className: "",
    });
    const vehicleMarker = L.marker([0, 0], { icon: vehicleIcon }).addTo(map);

    control.on("routesfound", (e: any) => {
      const coords = e.routes[0].coordinates;
      let i = 0;
      function animate() {
        if (i >= coords.length) return;
        vehicleMarker.setLatLng([coords[i].lat, coords[i].lng]);
        i++;
        requestAnimationFrame(animate);
      }
      animate();
    });

    return () => map.remove();
  }, []);

  return <div ref={mapRef} className="h-full w-full z-1" />;
}
