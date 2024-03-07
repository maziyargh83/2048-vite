import { createEmptyBoard } from "@/lib/board";
import { Board } from "@/types/BoardTypes";
import { atom } from "jotai";

export const boardStore = atom<Board>(createEmptyBoard());
