import { config } from "@/config/config";
import { AnimationKeyType } from "@/types/AnimationTypes";
import { Variant } from "framer-motion";

export const TailAnimationVariants: Partial<Record<AnimationKeyType, Variant>> =
  {
    fall: ({ color, isDone }) => ({
      width: "100%",
      height: isDone ? "0%" : config.height,
      bottom: "100%",
      background: color,
      opacity: 0.3,
    }),
    down: ({ color, isDone }) => ({
      width: "100%",
      height: isDone ? "0px" : "40px",
      bottom: "100%",
      background: color,
      opacity: 0.3,
    }),
  };
