import { memo, useCallback, useEffect, useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";

import { TileBlockBackgroundProps } from "@/types/TilesType";
import { AnimationTypes } from "@/types/AnimationTypes";
import { usePrevProps } from "@/hooks/usePrevProps";
import { TailAnimationVariants } from "@/components/Tail/TailAnimation";
import { TailManager } from "@/components/Tail/TailManager";
import { TailProps } from "@/types/TailType";

const TailComponent = ({
  color,
  animation,
  id,
}: TileBlockBackgroundProps & AnimationTypes & { id: string }) => {
  const [isDone, setIsDone] = useState(false);
  const boxControls = useAnimation();
  const prev_animation = usePrevProps(animation);
  const onDone = useCallback(() => {
    setIsDone(true);
  }, []);
  const TailProps: TailProps = {
    animation,
    color,
    isDone,
    onDone,
    id,
  };

  useEffect(() => {
    boxControls.start(animation);
  }, []);
  useEffect(() => {
    if (!prev_animation || prev_animation == animation) return;
    setIsDone(false);
    boxControls.start(animation);
  }, [animation]);
  useEffect(() => {
    if (isDone) {
      boxControls.start(animation);
    }
  }, [isDone]);

  return (
    <motion.div
      className="absolute"
      animate={boxControls}
      variants={TailAnimationVariants}
      custom={{
        color,
        isDone,
      }}
      initial={animation}
    >
      <AnimatePresence mode="wait">
        <TailManager {...TailProps} />
      </AnimatePresence>
    </motion.div>
  );
};
export const Tail = memo(TailComponent);
