import { create, StateCreator } from "zustand";
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

export type RatioType = {
  width: number;
  height: number;
};

type unitType = "km" | "mil" | "off";

export interface MapStoreType {
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

  ratio: RatioType;
  changeRatio: (ratio: RatioType) => void;
  
  is3D: boolean;
  toggleDimension: () => void;
}

const mapStore: StateCreator<MapStoreType> = (set, get) => ({
  cookieModal: true,
  closeCookieModal: () => set({ cookieModal: false }),

  waypoints: [
    { latitude: 21.9312, longitude: 76.2673, icon: "plane.svg" },
    { latitude: 19.9312, longitude: 76.2673, icon: "flag.svg" },
    { latitude: 9.9312, longitude: 76.2673, icon: "plane.svg" },
  ],
  setWayPoints: (wp: waypointsType[]) => set({ waypoints: wp }),

  selected: "route",
  changeSelected: () =>
    set((state: MapStoreType) => ({
      selected: state.selected === "route" ? "preview" : "route",
    })),

  mapStyle: 0,
  setMapStyle: (index: number) => set({ mapStyle: index }),

  modelSize: 80,
  setModalSize: (size: number) => set({ modelSize: size }),

  duration: 20,
  setDuration: (time: number) => set({ duration: time }),

  flag: true,
  setFlag: () => set((state: MapStoreType) => ({ flag: !state.flag })),

  unit: "km",
  setUnit: (u: unitType) => set({ unit: u }),

  position: { latitude: 9.9312, longitude: 76.2673 },
  setPosition: (pos: PositionType) => set({ position: pos }),

  ratio: { width: 16, height: 9 },
  changeRatio: (ratio: RatioType) => set({ ratio }),
  
  is3D: false,
  toggleDimension: () => set((state: MapStoreType) => ({ is3D: !state.is3D })),
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
