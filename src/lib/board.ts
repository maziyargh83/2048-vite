import { Board } from "@/types/BoardTypes";

export const createEmptyBoard = (): Board => {
  return Array.from({ length: 6 }, () => Array());
};
