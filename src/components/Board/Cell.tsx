import { cellWidth } from "@/config/config";

export const Cell = () => {
  return (
    <div
      className="h-full bg-slate-500/75"
      style={{
        width: cellWidth + "px",
      }}
    />
  );
};
