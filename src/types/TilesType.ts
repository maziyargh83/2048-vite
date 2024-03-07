import type { AnimationKeyType } from "@/types/AnimationTypes";
import type { MotionValue } from "framer-motion";

export interface TileProps {
  id: string;
  animation: AnimationKeyType;
  size: number;
  currentCell: number;
  currentPosition?: number;
  isGhost: boolean;
}

export type TilesStoreType = Map<string, TileProps>;

export interface TileBlockBackgroundProps {
  color: string;
}

export interface TileWrapperProps {
  positionY?: MotionValue<string>;
  positionX?: MotionValue<string>;
  absolute?: boolean;
  className?: string;
}
