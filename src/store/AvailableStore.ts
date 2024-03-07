import { getInitialTileNumber } from "@/lib/block";
import { currentSizeStore } from "@/store/currentSizeStore";
import { atom } from "jotai";

export const availableStore = atom<number[]>(
  getInitialTileNumber(currentSizeStore.init)
);
