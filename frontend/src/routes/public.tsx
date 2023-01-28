// import { lazyImport } from "@/utils/lazyImports";
import { Navigate } from "react-router-dom";
import { lazyImport } from "../utils/lazyImports";

const { PublicAuthRoutes } = lazyImport(
  () => import("../features/auth"),
  "PublicAuthRoutes"
);

export const publicRoutes = [
  {
    path: "auth/*",
    element: <PublicAuthRoutes />,
  },
  {
    path: "*",
    element: <Navigate to="auth/login" />,
  },
];
