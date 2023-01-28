import { Navigate, useRoutes } from "react-router-dom";
import { useAuth } from "../features/auth/contexts/AuthContext";
import { protectedRoutes } from "./protected";
import { publicRoutes } from "./public";

export const AppRoutes = () => {
  const { user } = useAuth();

  const routes = user ? protectedRoutes : publicRoutes;

  const element = useRoutes([
    ...routes,
    {
      path: "*",
      element: <Navigate to={"/items"} replace />,
    },
  ]);

  return <>{element}</>;
};
