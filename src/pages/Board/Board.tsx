import { Board } from "@/components/Board/Board";
import { Cell } from "@/components/Board/Cell";
import { TileManager } from "@/components/Board/TileManager";
import { Controls } from "@/components/Controls/Controls";
import { config } from "@/config/config";
import { v4 } from "uuid";

export const BoardPage = () => {
  return (
    <div className="w-full min-h-screen flex-col gap-3 flex justify-center items-center">
      <Board>
        {Array.from(new Array(config.cols)).map(() => {
          return <Cell key={v4()} />;
        })}
        <TileManager />
      </Board>

      <Controls />
    </div>
  );
};
