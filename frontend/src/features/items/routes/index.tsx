import { Navigate, Route, Routes } from "react-router-dom";
import { ViewItem } from "./ViewItem";
import { ViewItemList } from "./ViewItemList";

export const ItemRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<ViewItemList />} />
      <Route path=":id" element={<ViewItem />} />
      <Route path="*" element={<Navigate to="/items" />} />
    </Routes>
  );
};
