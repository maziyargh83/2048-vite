import { memo, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

import { TileBlockBackgroundProps } from "@/types/TilesType";
import { AnimationTypes, Animations } from "@/types/AnimationTypes";
import { usePrevProps } from "@/hooks/usePrevProps";
import { TailAnimationVariants } from "@/components/Tail/TailAnimation";
import { TailManager } from "@/components/Tail/TailManager";
import { TailProps } from "@/types/TailType";
import { useTaskQueue } from "@/hooks/useTaskQueue";
import { QueueStatusTypes } from "@/types/QueueTypes";
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";

const TailComponent = ({
  color,
  animation,
  id,
}: TileBlockBackgroundProps & AnimationTypes & { id: string }) => {
  const { updateTask } = useTaskQueue();
  const [isDone, setIsDone] = useState(false);
  const boxControls = useAnimation();
  const prev_animation = usePrevProps(animation);
  const finishTask = useDebouncedCallback(() => {
    if (animation == Animations.CLEAR) updateTask(id, QueueStatusTypes.DONE);
  }, 310);
  const onDone = () => {
    setIsDone(true);
  };

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
  }, [isDone, animation]);

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
      onAnimationComplete={finishTask}
    >
      <TailManager {...TailProps} />
    </motion.div>
  );
};
export const Tail = memo(TailComponent);
