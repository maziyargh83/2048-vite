import type { TilesStoreType } from "@/types/TilesType";
import { atom } from "jotai";

export const TileStore = atom<TilesStoreType>(new Map());
