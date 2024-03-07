import { RouterBoard } from "@/pages/Board";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
const router = createBrowserRouter([
  RouterBoard,
  {
    path: "*",
    element: <Navigate to={"/board"} />,
  },
]);
export const Router = () => {
  return <RouterProvider router={router} />;
};
