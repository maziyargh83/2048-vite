import { config } from "@/config/config";
import { PropsWithChildren } from "react";

export const Board = ({ children }: PropsWithChildren) => {
  return (
    <div
      className={`relative bg-accent flex justify-between overflow-hidden rounded`}
      style={{
        width: config.width + "px",
        height: config.height + "px",
      }}
    >
      {children}
    </div>
  );
};
