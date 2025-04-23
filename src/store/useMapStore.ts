import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export type PositionType = {
  latitude: number;
  longitude: number;
};

type waypointsType = {
  latitude: number;
  longitude: number;
  icon: string;
};

interface MapStoreType {
  selected: "route" | "preview";
  changeSelected: () => void;
  cookieModal: boolean;
  closeCookieModal: () => void;
  mapStyle: number;
  setMapStyle: (index: number) => void;
  position: PositionType;
  setPosition: (pos: PositionType) => void;
  waypoints: waypointsType[];
  setWayPoints: (pos: waypointsType) => void;
}

const mapStore = (set: any, get: any): MapStoreType => ({
  cookieModal: true,
  waypoints: [
    { latitude: 9.9312, longitude: 76.2673, icon: "car" },
    { latitude: 9.9312, longitude: 76.2673, icon: "bus" },
    { latitude: 9.9312, longitude: 76.2673, icon: "plane" },
  ],
  selected: "route",
  mapStyle: 0,
  setMapStyle: (index: number) => set({ mapStyle: index }),
  changeSelected: () =>
    set((state: MapStoreType) => ({
      selected: state.selected === "route" ? "preview" : "route",
    })),
  closeCookieModal: () => set({ cookieModal: false }),
  position: { latitude: 9.9312, longitude: 76.2673 },
  setPosition: (pos: PositionType) => set({ position: pos }),
  setWayPoints: (pos: PositionType) =>
    set((state: MapStoreType) => ({ waypoints: [...state.waypoints, pos] })),
});

const useMapStore = create<MapStoreType>()(
  devtools(
    persist(mapStore, {
      name: "map",
    })
  )
);

export default useMapStore;
