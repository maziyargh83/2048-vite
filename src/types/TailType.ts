import { AnimationTypes } from "@/types/AnimationTypes";
import { TileBlockBackgroundProps } from "@/types/TilesType";

export interface TailProps extends TileBlockBackgroundProps, AnimationTypes {
  isDone: boolean;
  onDone: () => void;
  id: string;
}
