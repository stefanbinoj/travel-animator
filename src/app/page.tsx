"use client";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

import { useEffect } from "react";

import useNavStore from "@/store/useNavStore";
import useMapStore from "@/store/useMapStore";

import MapNoSSR from "@/components/animator/map/mapNoSSR";
import ProModal from "@/components/animator/modals/proModal";
import SigninModal from "@/components/animator/modals/sign-inModal";
import ProfileModal from "@/components/animator/modals/profileModal";
import ExportModal from "@/components/animator/modals/exportModal";
import { toast } from "sonner";
import PreviewMap from "@/components/animator/map/previewMap";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import ChooseVehicle from "@/components/animator/modals/choseVehicleModal";

export default function Home() {
  useNavStore.subscribe(console.log);
  useMapStore.subscribe(console.log);

  const modal = useNavStore((state) => state.modal);

  const setPosition = useMapStore((state) => state.setPosition);

  const selected = useMapStore((state) => state.selected);

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
    <div className="h-dvh">
      {selected === "route" ? (
        <MapNoSSR />
      ) : (
        <div className="flex">
          <div className="flex-1 h-full w-full">
            <PreviewMap />
          </div>
          <SidebarProvider className="w-auto">
            <SidebarTrigger />
            <div className="flex flex-0 ">
              <ChooseVehicle />
            </div>
          </SidebarProvider>
        </div>
      )}
      {modal === "pro" && <ProModal />}
      {modal === "sign-in" && <SigninModal />}
      {modal === "profile" && <ProfileModal />}
      {modal === "export" && <ExportModal />}
    </div>
  );
}
