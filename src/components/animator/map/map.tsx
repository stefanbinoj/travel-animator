"use client";

import { mapStyleLinkArray } from "@/lib/constants";
import useMapStore from "@/store/useMapStore";
import L from "leaflet";
import "leaflet-routing-machine";
import { useEffect, useRef } from "react";

export default function Map() {
  const mapRef = useRef<HTMLDivElement | null>(null);

  const mapStyle = useMapStore((state) => state.mapStyle);

  const waypoints = useMapStore((state) => state.waypoints);
  const setWayPoints = useMapStore((state) => state.setWayPoints);

  let vehicleMarker: L.Marker<any>;
  let routeCoords: { lat: number; lng: number }[] = [];
  useEffect(() => {
    if (!mapRef.current) return;

    const map = L.map(mapRef.current).setView([9.9312, 76.2673], 5);

    L.tileLayer(`${mapStyleLinkArray[mapStyle]}`).addTo(map);

    const control = L.Routing.control({
      waypoints: waypoints.map((wp) => L.latLng(wp.latitude, wp.longitude)),
      router: L.Routing.osrmv1(),
      routeWhileDragging: true,
      createMarker: (i: number, wp: { latLng: L.LatLng }) => {
        const iconUrl = waypoints[i]?.icon ?? "default.png"; // fallback if needed

        const customIcon = L.icon({
          iconUrl: `/routes/${iconUrl}`, // assuming it's in public/routes/
          iconSize: [32, 32],
          iconAnchor: [16, 32], // center bottom
        });

        return L.marker(wp.latLng, { icon: customIcon }) as L.Marker;
      },
    } as L.Routing.RoutingControlOptions).addTo(map);

    map.on("click", (e: any) => {
      const newPoint = {
        latitude: e.latlng.lat,
        longitude: e.latlng.lng,
        icon: "plane",
      };

      setWayPoints([...waypoints, newPoint]);
    });

    const vehicleIcon = L.divIcon({ html: "🚗", iconSize: [32, 32] });
    vehicleMarker = L.marker([0, 0], { icon: vehicleIcon }).addTo(map);

    control.on("routesfound", (e: any) => {
      routeCoords = e.routes[0].coordinates; // Store for later animation
    });

    return () => {
      map.remove();
    };
  }, [mapStyle, waypoints]);

  const animateVehicle = () => {
    if (!routeCoords.length || !vehicleMarker) return;

    let i = 0;
    const animate = () => {
      if (i >= routeCoords.length) return;
      vehicleMarker.setLatLng([routeCoords[i].lat, routeCoords[i].lng]);
      i++;
      requestAnimationFrame(animate);
    };
    animate();
  };

  return <div ref={mapRef} className="h-full w-full z-0" />;
}
