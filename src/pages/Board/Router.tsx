import { RouteObject } from "react-router-dom";
import { BoardPage } from "./Board";

export const RouterBoard: RouteObject = {
  path: "/board",
  element: <BoardPage />,
};
