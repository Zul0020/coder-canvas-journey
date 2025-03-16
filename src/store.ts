
import { create } from "zustand";

type StoreState = {
  section: number;
};

export const useStore = create<StoreState>(() => ({
  section: 0,
}));
