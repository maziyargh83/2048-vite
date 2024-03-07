import { Tail } from "@/components/Tail/Tail";
import Tile from "@/components/Tiles/Tile";
import { generateColor } from "@/lib/color";
import { TileProps } from "@/types/TilesType";
import { memo } from "react";

const TileData = (data: TileProps) => {
  const { animation, size, id } = data;
  const color = generateColor(size);
  return (
    <Tile.TileWrapper key={"wrapper" + id} {...data}>
      <Tile.TileBackGround color={color}>
        {size}
        <Tail animation={animation} color={color} id={id} />
      </Tile.TileBackGround>
    </Tile.TileWrapper>
  );
};
export const TieAnimated = memo(TileData, (prev, next) => {
  return (
    prev.currentCell === next.currentCell &&
    prev.currentPosition === next.currentPosition &&
    prev.animation === next.animation &&
    prev.size === next.size
  );
});
