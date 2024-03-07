import { memo, type PropsWithChildren } from "react";
import { motion } from "framer-motion";
import { cellHeight, cellWidth } from "@/config/config";
import { cn } from "@/lib/utils";
import { TileProps, TileWrapperProps } from "@/types/TilesType";
import { useTileManager } from "@/hooks/useTileManager";

const TileWrapperComponent = ({
  children,
  currentCell,
  currentPosition,
  animation,
  absolute = true,
  className,
}: PropsWithChildren<Partial<TileWrapperProps & TileProps>>) => {
  const { top, left } = useTileManager(
    currentCell!,
    currentPosition!,
    animation!
  );
  return (
    <motion.div
      style={{
        bottom: top,
        left: left,
        width: cellWidth + "px",
        height: cellHeight + "px",
      }}
      className={cn(
        "rounded p-2",
        {
          ["absolute"]: absolute,
        },
        className
      )}
    >
      {children}
    </motion.div>
  );
};
export const TileWrapper = memo(TileWrapperComponent, (prev, next) => {
  return (
    prev.currentCell === next.currentCell &&
    prev.currentPosition === next.currentPosition &&
    prev.animation === next.animation &&
    prev.size === next.size
  );
});
