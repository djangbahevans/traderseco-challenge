// import { useAuth } from "@/features/auth/contexts/AuthContext";
import { Navigate, useRoutes } from "react-router-dom";
// import { protectedRoutes, protectedAuthRoutes } from "./protected";
import { publicRoutes } from "./public";

export const AppRoutes = () => {
  // const { user } = useAuth();

  // Do not include login type selection if user is a super admin
  const routes = publicRoutes;

  const element = useRoutes([
    ...routes,
    {
      path: "*",
      element: (
        <Navigate to={"/auth/login"} replace />
      ),
    },
  ]);

  return <>{element}</>;
};
