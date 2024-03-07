import { TieAnimated } from "@/components/Tiles/TileAnimated";
import { TileStore } from "@/store/TilesStore";
import { useAtomValue } from "jotai";
import { Fragment } from "react/jsx-runtime";

export const TileManager = () => {
  const tiles = useAtomValue(TileStore);

  return (
    <Fragment>
      {Array.from(tiles.entries()).map(([key, data]) => (
        <TieAnimated {...data} key={key} />
      ))}
    </Fragment>
  );
};
