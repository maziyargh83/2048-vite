import { boardStore } from "@/store/BoardStore";
import { useAtom } from "jotai";

export const useCellManager = () => {
  const [board, setBoard] = useAtom(boardStore);
  const addNewItemToCell = (id: string, cellNumber: number) => {
    const boardTiles = [...board];
    const boardData = [...board[cellNumber], id];

    boardTiles.splice(cellNumber, 1, boardData);
    setBoard(boardTiles);
  };
  const removeItemInCell = (id: string, cellNumber: number) => {
    const boardTiles = [...board];
    const boardData = board[cellNumber].filter((i) => i !== id);

    boardTiles.splice(cellNumber, 1, boardData);
    setBoard(boardTiles);
    return boardData;
  };
  const getCellTiles = (cellNumber: number) => {
    return board[cellNumber];
  };
  const getCellPosition = (cellNumber: number) => {
    return board[cellNumber].length;
  };
  const checkBoard = () => {
    console.log("====================================");
    console.log(board);
    console.log("====================================");
  };
  return {
    checkBoard,
    addNewItemToCell,
    removeItemInCell,
    getCellPosition,
    getCellTiles,
  };
};
