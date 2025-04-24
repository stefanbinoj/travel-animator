"use client";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

import { useEffect } from "react";

import useNavStore from "@/store/useNavStore";
import useMapStore from "@/store/useMapStore";

import MapNoSSR from "@/components/animator/map/mapNoSSR";
import ProModal from "@/components/animator/modals/proModal";
import DiscardModal from "@/components/animator/modals/discardModal";
import SigninModal from "@/components/animator/modals/sign-inModal";
import ProfileModal from "@/components/animator/modals/profileModal";
import ExportModal from "@/components/animator/modals/exportModal";
import { toast } from "sonner";

export default function Home() {
  useNavStore.subscribe(console.log);
  useMapStore.subscribe(console.log);

  const modal = useNavStore((state) => state.modal);

  const setPosition = useMapStore((state) => state.setPosition);

  useEffect(() => {
    if (!navigator.geolocation) {
      toast("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (err) => {
        toast(`Error getting location: ${err.message}`);
      }
    );
  }, []);

  return (
    <div className="h-full">
      <MapNoSSR />
      {modal === "pro" && <ProModal />}
      {modal === "discard" && <DiscardModal />}
      {modal === "sign-in" && <SigninModal />}
      {modal === "profile" && <ProfileModal />}
      {modal === "export" && <ExportModal />}
    </div>
  );
}
