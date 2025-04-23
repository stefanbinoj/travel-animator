import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export type PositionType = {
  latitude: number;
  longitude: number;
};

export type waypointsType = {
  latitude: number;
  longitude: number;
  icon: string;
};

type unitType = "km" | "mil" | "off";

interface MapStoreType {
  selected: "route" | "preview";
  changeSelected: () => void;

  cookieModal: boolean;
  closeCookieModal: () => void;

  position: PositionType;
  setPosition: (pos: PositionType) => void;

  waypoints: waypointsType[];
  setWayPoints: (wp: waypointsType[]) => void;

  modelSize: number;
  setModalSize: (size: number) => void;

  duration: number;
  setDuration: (time: number) => void;

  flag: boolean;
  setFlag: () => void;

  unit: unitType;
  setUnit: (u: unitType) => void;

  mapStyle: number;
  setMapStyle: (index: number) => void;
}

const mapStore = (set: any, get: any): MapStoreType => ({
  cookieModal: true,
  closeCookieModal: () => set({ cookieModal: false }),

  waypoints: [
    { latitude: 21.9312, longitude: 76.2673, icon: "plane" },
    { latitude: 19.9312, longitude: 76.2673, icon: "finished" },
    { latitude: 9.9312, longitude: 76.2673, icon: "plane" },
  ],
  setWayPoints: (wp: PositionType[]) => set({ waypoints: wp }),

  selected: "route",
  changeSelected: () =>
    set((state: MapStoreType) => ({
      selected: state.selected === "route" ? "preview" : "route",
    })),

  mapStyle: 0,
  setMapStyle: (index: number) => set({ mapStyle: index }),

  modelSize: 0.8,
  setModalSize: (size: number) => set({ modelSize: size }),

  duration: 0.2,
  setDuration: (time: number) => set({ duration: time }),

  flag: true,
  setFlag: () => set((state: MapStoreType) => ({ flag: !state.flag })),

  unit: "km",
  setUnit: (u: unitType) => set({ unit: u }),

  position: { latitude: 9.9312, longitude: 76.2673 },
  setPosition: (pos: PositionType) => set({ position: pos }),
});

// const useMapStore = create<MapStoreType>()(
//   devtools(
//     persist(mapStore, {
//       name: "map",
//     })
//   )
// );

const useMapStore = create<MapStoreType>()(mapStore);

export default useMapStore;
