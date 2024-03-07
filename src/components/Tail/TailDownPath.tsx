import { motion } from "framer-motion";
import { TailProps } from "@/types/TailType";
export const TailDownPath = ({
  onDone,
  color,
  isDone,
  animation,
  id,
}: TailProps) => {
  return (
    <motion.svg
      width="294"
      viewBox="0 0 294 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute bottom-[95%] w-full "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      key={animation + "_" + id}
      onAnimationComplete={onDone}
    >
      <motion.path
        d="M117 33C117 14.7746 131.775 0 150 0C168.225 0 183 14.7746 183 33V173.474C185.567 177.377 189.006 180.655 193.039 183.031C197.211 186.152 202.39 188 208 188C212.186 188 216.132 186.971 219.598 185.153C224.975 183.051 229.61 179.467 233 174.904V113.5C233 96.6553 246.655 83 263.5 83C280.345 83 294 96.6553 294 113.5V280H142H0V66.5C0 49.6553 13.6553 36 30.5 36C47.3447 36 61 49.6553 61 66.5V117C61 115.642 61.0967 114.306 61.2836 113C63.2245 126.569 74.8941 137 89 137C103.106 137 114.776 126.569 116.716 113C116.903 114.306 117 115.642 117 117V33Z"
        fill={color}
        animate={{ opacity: isDone ? 0 : 1 }}
        transition={animation == "down" ? { duration: 0.2 } : { delay: 0.2 }}
      />
    </motion.svg>
  );
};
