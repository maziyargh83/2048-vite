import { Tail } from "@/components/Tail/Tail";
import Tile from "@/components/Tiles/Tile";
import { generateColor } from "@/lib/color";
import { cn } from "@/lib/utils";
import { previewTilesStore } from "@/store/TilesPreviewStore";

import { useAtomValue } from "jotai";

export const Preview = () => {
  const previews = useAtomValue(previewTilesStore);
  const preview = previews.slice(0, 2);
  return (
    <div className="flex items-center">
      {preview.map(({ size, id }, i) => {
        const color = generateColor(size);
        return (
          <Tile.TileWrapper
            key={id}
            className={cn({
              ["scale-75"]: i != 0,
            })}
            absolute={false}
          >
            <Tile.TileBackGround color={color}>{size}</Tile.TileBackGround>
          </Tile.TileWrapper>
        );
      })}
    </div>
  );
};
