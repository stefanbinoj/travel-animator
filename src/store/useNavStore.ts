import { create } from "zustand";

export type ModalType =
  | "pro"
  | "sign-in"
  | "export"
  | "discard"
  | "profile"
  | null;

interface NavStoreType {
  modal: ModalType;
  setModal: (modal: ModalType) => void;
}

const navStore = (
  set: (partial: Partial<NavStoreType>) => void
): NavStoreType => ({
  modal: null,
  setModal: (modal) => set({ modal }),
});

const useNavStore = create<NavStoreType>()(navStore);

export default useNavStore;
