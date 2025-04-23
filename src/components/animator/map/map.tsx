"use client";

import L from "leaflet";
import "leaflet-routing-machine";
import { useEffect, useRef } from "react";

export default function Map() {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = L.map(mapRef.current).setView([9.9312, 76.2673], 5);

    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        attribution: "Tiles &copy; Esri",
        maxZoom: 19,
      }
    ).addTo(map);

    // Routing control (uncomment when needed)
    // const control = L.Routing.control({
    //   waypoints: [L.latLng(51.505, -0.09), L.latLng(51.51, -0.047)],
    //   router: L.Routing.osrmv1(),
    //   routeWhileDragging: true,
    //   createMarker: () => null,
    // }).addTo(map);

    // Click event to add waypoints (uncomment when needed)
    // map.on("click", (e: any) => {
    //   const wps = control.getWaypoints();
    //   control.spliceWaypoints(wps.length - 1, 0, e.latlng);
    // });

    // Add vehicle marker and animate it along the route (uncomment when needed)
    // const vehicleIcon = L.divIcon({
    //   html: "🚗",
    //   iconSize: [32, 32],
    // });
    // const vehicleMarker = L.marker([0, 0], { icon: vehicleIcon }).addTo(map);
    // control.on("routesfound", (e: any) => {
    //   const coords = e.routes[0].coordinates;
    //   let i = 0;
    //   const animate = () => {
    //     if (i >= coords.length) return;
    //     vehicleMarker.setLatLng([coords[i].lat, coords[i].lng]);
    //     i++;
    //     requestAnimationFrame(animate);
    //   };
    //   animate();
    // });

    return () => {
      map.remove();
    };
  }, []);

  return <div ref={mapRef} className="h-full w-full z-0" />;
}
