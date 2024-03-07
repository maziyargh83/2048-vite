import { TailDownPath } from "@/components/Tail/TailDownPath";
import { Animations } from "@/types/AnimationTypes";
import { TailProps } from "@/types/TailType";
import { Fragment } from "react/jsx-runtime";

export const TailManager = (TailProps: TailProps) => {
  switch (TailProps.animation) {
    case Animations.DOWN:
    case Animations.FALL:
      return <TailDownPath key={"tail" + TailProps.id} {...TailProps} />;

    default:
      return <Fragment />;
  }
};
