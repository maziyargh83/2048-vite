import { cellHeight, cellWidth } from "@/config/config";
import { AnimationKeyType } from "@/types/AnimationTypes";
import { useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
const addGap = (i: number) => (i == 0 ? 0 : 10);
export const useTileManager = (
  currentCell: number,
  currentPosition: number,
  animation: AnimationKeyType
) => {
  const x = useSpring(currentCell);
  const y = useSpring(100, {
    duration: 400,
    bounce: 0,
  });
  const top = useTransform(y, (v) => (cellHeight + 10) * v + "px");
  const left = useTransform(
    x,
    (v) => (cellWidth + addGap(v)) * v + v * 2 + "px"
  );

  useEffect(() => {
    y.set(currentPosition);
  }, [currentPosition]);
  useEffect(() => {
    x.set(currentCell);
  }, [currentCell]);

  return { top, left };
};
