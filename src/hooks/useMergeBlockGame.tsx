import { useCellManager } from "@/hooks/useCellManager";
import { usePreviewManager } from "@/hooks/usePreviewManager";
import { TileStore } from "@/store/TilesStore";
import { Animations } from "@/types/AnimationTypes";
import { TileProps } from "@/types/TilesType";
import { useAtom } from "jotai";
import { useEffect } from "react";
export const useMergeBlockGame = () => {
  const [tiles, setTiles] = useAtom(TileStore);
  const { addNewItemToCell, removeItemInCell, getCellPosition, getCellTiles } =
    useCellManager();
  const { initialPreviews, getFirstPreview, removePreview } =
    usePreviewManager();

  const createBlock = (cellNumber: number = 1) => {
    const newMap = new Map(tiles);

    const cell: TileProps = getFirstPreview();
    cell.currentCell = cellNumber;
    cell.currentPosition = getCellPosition(cellNumber);
    newMap.set(cell.id, cell);
    setTiles(newMap);
    addNewItemToCell(cell.id, cellNumber);
    removePreview(cell.id);
  };
  const updateAllCurrentPositionToDown = (
    resultMap: typeof tiles,
    tilesResult: string[]
  ) => {
    const newMap = new Map(resultMap);
    tilesResult.map((item) => {
      const data = newMap.get(item)!;
      const index = tilesResult.findIndex((d) => d == data?.id);
      newMap.set(item, { ...data, currentPosition: index });
    });
    return newMap;
  };
  const removeBlock = () => {
    const newMap = new Map(tiles);
    const firstBlock = getFirstBlock();
    const tilesResult = removeItemInCell(firstBlock.id, firstBlock.currentCell);
    newMap.delete(firstBlock.id)!;
    const resultMap = updateAllCurrentPositionToDown(newMap, tilesResult);
    setTiles(resultMap);
  };

  const MoveDownAndRemove = (lastTile: TileProps, targetTile: TileProps) => {
    const newMap = new Map(tiles);

    const tilesResult = removeItemInCell(targetTile.id, targetTile.currentCell);

    newMap.set(lastTile.id, {
      ...lastTile,
      animation: Animations.DOWN,
    });

    const resultMap = updateAllCurrentPositionToDown(newMap, tilesResult);
    setTiles(resultMap);
  };
  const moveBlock = () => {
    const newMap = new Map(tiles);
    const firstBlock = getFirstBlock();

    const tile = newMap.get(firstBlock.id)!;
    const tilesResult = removeItemInCell(firstBlock.id, firstBlock.currentCell);
    tile.currentCell = tile.currentCell + 1;
    const resultMap = updateAllCurrentPositionToDown(newMap, tilesResult);

    setTiles(resultMap);
  };

  const moveBlockBack = () => {
    const newMap = new Map(tiles);
    const firstBlock = getFirstBlock();

    const tile = newMap.get(firstBlock.id)!;
    tile.currentCell = tile.currentCell - 1;
    setTiles(newMap);
  };
  const getFirstBlock = () => {
    return Array.from(tiles.values())[0];
  };
  const getLastBlock = () => {
    return Array.from(tiles.values())[tiles.size - 1];
  };
  const getValuesById = (id: string[]) => {
    return id.map((i) => tiles.get(i)!);
  };
  const checkUpAndDown = (tilesValue: TileProps[], lastTile: TileProps) => {
    const downBlock = tilesValue.find(
      (i) => i.currentPosition == lastTile.currentPosition! - 1
    );
    if (downBlock && downBlock.size == lastTile.size) {
      MoveDownAndRemove(lastTile, downBlock);
    }
  };
  const checkMerge = () => {
    const lastTile = getLastBlock();
    const tilesId = getCellTiles(lastTile.currentCell);
    const tilesCell = getValuesById(tilesId);
    const upAndDownResult = checkUpAndDown(tilesCell, lastTile);

    // checkBoard();
  };
  useEffect(() => {
    initialPreviews();
  }, []);
  return {
    createBlock,
    moveBlock,
    moveBlockBack,
    removeBlock,
    checkMerge,
    getLastBlock,
  };
};
