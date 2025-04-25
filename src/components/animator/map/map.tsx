"use client";

import { mapStyleLinkArray } from "@/lib/constants";
import useMapStore, { waypointsType } from "@/store/useMapStore";
import L from "leaflet";
import "leaflet-routing-machine";
import { useEffect, useRef, useState } from "react";
import { getAngle } from "@/lib/angleCalc";

export default function Map() {
  const [distance, setDistance] = useState<number | null>(null);

  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const controlRef = useRef<L.Routing.Control | null>(null);
  const vehicleMarkerRef = useRef<L.Marker | null>(null);
  const routeCoordsRef = useRef<{ lat: number; lng: number }[]>([]);
  const ratio = useMapStore((state) => state.ratio);
  const selected = useMapStore((state) => state.selected);
  const selectedVehicleAvatar = useMapStore(
    (state) => state.selectedVehicleAvatar
  );
  const modelSize = useMapStore((state) => state.modelSize);
  const duration = useMapStore((state) => state.duration);

  const mapStyle = useMapStore((state) => state.mapStyle);
  const position = useMapStore((state) => state.position);

  const waypoints = useMapStore((state) => state.waypoints);
  const setWayPoints = useMapStore((state) => state.setWayPoints);

  // Initialize map once - removed ratio dependency
  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current).setView(
      [position.latitude, position.longitude],
      5
    );
    mapInstance.current = map;

    // Add initial tile layer
    L.tileLayer(mapStyleLinkArray[mapStyle]).addTo(map);

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  // Handle ratio changes by invalidating the map size
  useEffect(() => {
    if (!mapInstance.current) return;

    // This tells Leaflet that the container size has changed and needs to be recalculated
    setTimeout(() => {
      mapInstance.current?.invalidateSize();
    }, 0);
  }, [ratio]);

  // Add tile layer when mapStyle changes
  useEffect(() => {
    if (!mapInstance.current) return;

    // Remove all existing tile layers first
    mapInstance.current.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        mapInstance.current?.removeLayer(layer);
      }
    });

    // Add the new tile layer
    L.tileLayer(mapStyleLinkArray[mapStyle]).addTo(mapInstance.current);
  }, [mapStyle]);

  // Add or update routing control when waypoints change
  useEffect(() => {
    if (!mapInstance.current) return;

    // Safe removal of existing control
    if (controlRef.current && mapInstance.current) {
      try {
        mapInstance.current.removeControl(controlRef.current);
      } catch (error) {
        console.log("Error removing control:", error);
      }
      controlRef.current = null;
    }

    // Safe removal of existing vehicle marker
    if (vehicleMarkerRef.current && mapInstance.current) {
      try {
        mapInstance.current.removeLayer(vehicleMarkerRef.current);
      } catch (error) {
        console.log("Error removing vehicle marker:", error);
      }
      vehicleMarkerRef.current = null;
    }

    const control = L.Routing.control({
      waypoints: waypoints.map((wp) => L.latLng(wp.latitude, wp.longitude)),
      router: L.Routing.osrmv1(),
      routeWhileDragging: true,
      show: false,
      createMarker: (i: number, wp: { latLng: L.LatLng }) => {
        const iconUrl = waypoints[i]?.icon ?? "flag.svg";
        const marker = L.marker(wp.latLng, {
          icon: L.icon({
            iconUrl: `/${iconUrl}`,
            iconSize: [32, 32],
            iconAnchor: [16, 32],
          }),
          draggable: true,
          autoPan: true,
        }) as L.Marker;

        marker.on("dragend", function () {
          const newLatLng = marker.getLatLng();

          const updatedWaypoints = [...waypoints];
          if (updatedWaypoints[i]) {
            updatedWaypoints[i] = {
              ...updatedWaypoints[i],
              latitude: newLatLng.lat,
              longitude: newLatLng.lng,
            };
          }
          setWayPoints(updatedWaypoints);
        });

        return marker;
      },
    } as L.Routing.RoutingControlOptions).addTo(mapInstance.current);

    controlRef.current = control;

    const vehicleIcon = L.icon({
      className: "leaflet-rotated-icon",
      iconUrl: `${selectedVehicleAvatar}`,
      iconSize: [modelSize, modelSize],
      iconAnchor: [modelSize / 2, modelSize / 2], // center the icon
    });
    const marker = L.marker([waypoints[0].latitude, waypoints[0].longitude], {
      icon: vehicleIcon,
    }).addTo(mapInstance.current);
    vehicleMarkerRef.current = marker;

    control.on("routesfound", (e: any) => {
      if (e.routes && e.routes.length > 0 && e.routes[0].coordinates) {
        routeCoordsRef.current = e.routes[0].coordinates;
        setDistance(e.routes[0].summary.totalDistance);
      }
    });

    return () => {
      // Safe cleanup on unmount/dependency change
      if (controlRef.current && mapInstance.current) {
        try {
          mapInstance.current.removeControl(controlRef.current);
        } catch (error) {
          console.log("Error cleaning up control:", error);
        }
        controlRef.current = null;
      }

      if (vehicleMarkerRef.current && mapInstance.current) {
        try {
          mapInstance.current.removeLayer(vehicleMarkerRef.current);
        } catch (error) {
          console.log("Error cleaning up vehicle marker:", error);
        }
        vehicleMarkerRef.current = null;
      }
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

    const mapInstanceCurrent = mapInstance.current;
    mapInstanceCurrent.on("click", onClick);

    return () => {
      // Safe cleanup with a reference to the map instance
      if (mapInstanceCurrent) {
        try {
          mapInstanceCurrent.off("click", onClick);
        } catch (error) {
          console.log("Error removing click listener:", error);
        }
      }
    };
  }, [waypoints, setWayPoints]);

  const animateVehicle = () => {
    const coords = routeCoordsRef.current;
    const marker = vehicleMarkerRef.current;
    if (!coords.length || !marker) return;

    let i = 0;
    const animate = () => {
      if (i >= coords.length || !marker) return;
      try {
        const from = L.latLng(coords[i]);
        const to = L.latLng(coords[i + 1]);
        marker.setLatLng([coords[i].lat, coords[i].lng]);
        const angle = getAngle(from, to);
        const el = marker.getElement();
        // if (el) {
        //   el.style.transform = `rotate(${angle}deg)`;
        // }
      } catch (error) {
        console.log("Error animating vehicle:", error);
        return; // Stop animation if there's an error
      }
      i++;
      requestAnimationFrame(animate);
    };
    animate();
  };

  useEffect(() => {
    if (selected === "preview" && waypoints.length >= 2) {
      animateVehicle();
    } else {
      console.log(1);
    }
  }, [selected, waypoints, routeCoordsRef.current]);

  return <div ref={mapRef} className="h-full w-full z-0 rounded-2xl" />;
}
