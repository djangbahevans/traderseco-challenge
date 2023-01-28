import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../../auth/contexts/AuthContext";
import { AddItem } from "./AddItem";
import { EditItem } from "./EditItem";
import { ViewItem } from "./ViewItem";
import { ViewItemList } from "./ViewItemList";

export const ItemRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="" element={<ViewItemList />} />
      {user && (
        <>
          <Route path="add" element={<AddItem />} />
          <Route path=":id" element={<ViewItem />} />
          <Route path=":id/edit" element={<EditItem />} />
        </>
      )}
      <Route path="*" element={<Navigate to="/items" />} />
    </Routes>
  );
};
