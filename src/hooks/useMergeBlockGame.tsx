import { useCellManager } from "@/hooks/useCellManager";
import { usePreviewManager } from "@/hooks/usePreviewManager";
import { useTaskQueue } from "@/hooks/useTaskQueue";
import { TileStore } from "@/store/TilesStore";
import { Animations } from "@/types/AnimationTypes";
import {
  QueueObjectType,
  QueueStatusTypes,
  QueueTypes,
} from "@/types/QueueTypes";
import { TileProps } from "@/types/TilesType";
import { useAtom } from "jotai";
import { useEffect } from "react";
export const useMergeBlockGame = () => {
  const [tiles, setTiles] = useAtom(TileStore);
  const { addTask, queue, removeTask } = useTaskQueue();
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
  const removeBlockId = (id: string) => {
    const newMap = new Map(tiles);
    newMap.delete(id)!;
    setTiles(newMap);
    return newMap;
  };
  const updateSize = (
    lastTile: TileProps,
    targetTile: TileProps,
    result: typeof tiles
  ) => {
    let newMap = new Map(result);

    newMap.set(lastTile.id, {
      ...lastTile,
      animation: Animations.DOWN,
      size: lastTile.size + targetTile.size,
    });
    setTiles(newMap);
  };
  const MoveDownAndRemove = (lastTile: TileProps, targetTile: TileProps) => {
    let newMap = new Map(tiles);

    const tilesResult = removeItemInCell(targetTile.id, targetTile.currentCell);

    newMap.set(lastTile.id, {
      ...lastTile,
      animation: Animations.DOWN,
    });
    newMap.set(targetTile.id, {
      ...targetTile,
      animation: "clear",
    });
    addTask(QueueTypes.REMOVE, targetTile.id, lastTile.id);

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
  const checkBoard = () => {};
  const checkMerge = () => {
    const lastTile = getLastBlock();
    const tilesId = getCellTiles(lastTile.currentCell);
    const tilesCell = getValuesById(tilesId);
    checkUpAndDown(tilesCell, lastTile);

    checkBoard();
  };
  const queueAction = (queue: QueueObjectType) => {
    const last = tiles.get(queue.reserveID!)!;
    const target = tiles.get(queue.targetId!)!;
    console.log({
      last,
      target,
      queue,
    });

    switch (queue.type) {
      case QueueTypes.REMOVE:
        const result = removeBlockId(queue.targetId);
        updateSize(last, target, result);
        removeTask(queue.id);
        break;
    }
  };
  const handleQueue = (doneQueue: QueueObjectType[]) => {
    doneQueue.map((q) => {
      queueAction(q);
    });
  };
  useEffect(() => {
    initialPreviews();
  }, []);
  useEffect(() => {
    const doneQueue = queue.filter((i) => i.status == QueueStatusTypes.DONE);
    if (doneQueue.length > 0) {
      handleQueue(doneQueue);
    }
  }, [queue]);
  useEffect(() => {
    if (tiles.size > 1) checkMerge();
  }, [tiles]);
  return {
    createBlock,
    moveBlock,
    moveBlockBack,
    removeBlock,
    checkMerge,
    getLastBlock,
  };
};
