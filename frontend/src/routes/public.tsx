// import { lazyImport } from "@/utils/lazyImports";
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

export const publicRoutes = [
  {
    path: "/items/*",
    element: <ItemRoutes />,
  },
  {
    path: "/auth/*",
    element: <PublicAuthRoutes />,
  },
  {
    path: "*",
    element: <Navigate to="/items" />,
  },
];
