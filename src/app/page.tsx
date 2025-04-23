"use client";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import MapNoSSR from "@/components/animator/map/mapNoSSR";
import useNavStore from "@/store/useNavStore";

import ProModal from "@/components/animator/modals/proModal";
import DiscardModal from "@/components/animator/modals/proModal";
import SigninModal from "@/components/animator/modals/proModal";
import ProfileModal from "@/components/animator/modals/proModal";
import ExportModal from "@/components/animator/modals/proModal";

export default function Home() {
  useNavStore.subscribe(console.log);

  const modal = useNavStore((state) => state.modal);

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
