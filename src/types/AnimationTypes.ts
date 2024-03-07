export const Animations = {
  BOTH: "both",
  LEFT: "left",
  RIGHT: "right",
  DOWN: "down",
  FALL: "fall",
} as const;

// Convert object key in a type
export type AnimationKeyType = (typeof Animations)[keyof typeof Animations];

export interface AnimationTypes {
  animation: AnimationKeyType;
}
