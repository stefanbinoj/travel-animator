"use client";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import MapNoSSR from "@/components/animator/map/mapNoSSR";

export default function Home() {
  return (
    <div className="h-full bg-red-50">
      <MapNoSSR />
    </div>
  );
}
