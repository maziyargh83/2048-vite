import type { TileProps } from "@/types/TilesType";
import { atom } from "jotai";
export const previewTilesStore = atom<TileProps[]>([]);
