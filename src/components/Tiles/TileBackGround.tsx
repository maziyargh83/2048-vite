import type { PropsWithChildren } from "react";
import type { TileBlockBackgroundProps } from "@/types/TilesType";
import { motion } from "framer-motion";

export const TileBackGround = ({
  color,
  children,
}: PropsWithChildren<TileBlockBackgroundProps>) => {
  return (
    <motion.div
      animate={{
        background: color,
      }}
      className="w-full h-full rounded flex justify-center items-center relative"
    >
      {children}
    </motion.div>
  );
};
