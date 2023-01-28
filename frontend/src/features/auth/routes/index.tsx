import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./Login";
import { Register } from "./Register";

export const PublicAuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="*" element={<Navigate to="/items" />} />
    </Routes>
  );
};
