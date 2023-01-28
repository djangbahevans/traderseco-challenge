import { Navigate, Route, Routes } from "react-router-dom";
import { ViewItemList } from "./ViewItemList";

export const ItemRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<ViewItemList />} />
      {/* <Route path="register" element={<Register />} /> */}
      <Route path="*" element={<Navigate to="/items" />} />
    </Routes>
  );
};
