"use client";

import { mapStyleLinkArray } from "@/lib/constants";
import useMapStore from "@/store/useMapStore";
import L from "leaflet";
import "leaflet-routing-machine";
import { useEffect, useRef } from "react";

export default function Map() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const controlRef = useRef<L.Routing.Control | null>(null);
  const vehicleMarkerRef = useRef<L.Marker | null>(null);
  const routeCoordsRef = useRef<{ lat: number; lng: number }[]>([]);

  const mapStyle = useMapStore((state) => state.mapStyle);
  const position = useMapStore((state) => state.position);

  const waypoints = useMapStore((state) => state.waypoints);
  const setWayPoints = useMapStore((state) => state.setWayPoints);

  // Initialize map once
  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current).setView(
      [position.latitude, position.longitude],
      5
    );
    mapInstance.current = map;

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  // Add tile layer when mapStyle changes
  useEffect(() => {
    if (!mapInstance.current) return;
    L.tileLayer(mapStyleLinkArray[mapStyle]).addTo(mapInstance.current);
  }, [mapStyle]);

  // Add or update routing control when waypoints change
  useEffect(() => {
    if (!mapInstance.current) return;

    if (controlRef.current) {
      mapInstance.current.removeControl(controlRef.current);
    }

    const control = L.Routing.control({
      waypoints: waypoints.map((wp) => L.latLng(wp.latitude, wp.longitude)),
      router: L.Routing.osrmv1(),
      routeWhileDragging: true,
      show: false,
      createMarker: (i: number, wp: { latLng: L.LatLng }) => {
        const iconUrl = waypoints[i]?.icon ?? "flag.svg";
        return L.marker(wp.latLng, {
          icon: L.icon({
            iconUrl: `/${iconUrl}`,
            iconSize: [32, 32],
            iconAnchor: [16, 32],
          }),
        }) as L.Marker;
      },
    } as L.Routing.RoutingControlOptions).addTo(mapInstance.current);

    controlRef.current = control;

    const vehicleIcon = L.divIcon({ html: "🚗", iconSize: [32, 32] });
    const marker = L.marker([0, 0], { icon: vehicleIcon }).addTo(
      mapInstance.current
    );
    vehicleMarkerRef.current = marker;

    control.on("routesfound", (e: any) => {
      routeCoordsRef.current = e.routes[0].coordinates;
    });

    return () => {
      if (controlRef.current)
        mapInstance.current?.removeControl(controlRef.current);
    };
  }, [waypoints]);

  // Click event to add new waypoint
  useEffect(() => {
    if (!mapInstance.current) return;

    const onClick = (e: any) => {
      setWayPoints([
        ...waypoints,
        {
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
          icon: "plane.svg",
        },
      ]);
    };

    mapInstance.current.on("click", onClick);

    return () => {
      mapInstance.current?.off("click", onClick);
    };
  }, [waypoints]);

  // Vehicle animation trigger (can be used on a button click)
  const animateVehicle = () => {
    const coords = routeCoordsRef.current;
    const marker = vehicleMarkerRef.current;
    if (!coords.length || !marker) return;

    let i = 0;
    const animate = () => {
      if (i >= coords.length) return;
      marker.setLatLng([coords[i].lat, coords[i].lng]);
      i++;
      requestAnimationFrame(animate);
    };
    animate();
  };

  return <div ref={mapRef} className="h-full w-full z-0" />;
}
