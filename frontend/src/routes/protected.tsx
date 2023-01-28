import { Navigate } from "react-router-dom";
import { lazyImport } from "../utils/lazyImports";

const { PublicAuthRoutes } = lazyImport(
  () => import("../features/auth"),
  "PublicAuthRoutes"
);
const { ItemRoutes } = lazyImport(
  () => import("../features/items"),
  "ItemRoutes"
);

export const protectedRoutes = [
  {
    path: "/items/*",
    element: <ItemRoutes />,
  },
  {
    path: "*",
    element: <Navigate to="/items" />,
  },
];
