import { useMutation } from "@tanstack/react-query";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../../../libs/react-query";
import { addShoe } from "../api/addShoe";
import { EditItemInputs } from "../api/editShoe";
import { EditItemForm } from "../components/EditItemForm";
import { Layout } from "../components/Layout";

export const AddItem: FC = () => {
  const navigate = useNavigate();

  const { mutateAsync } = useMutation({
    mutationFn: async (data: EditItemInputs) => {
      const item = await addShoe(data);
      return item;
    },
    onError: (error) => {
      console.error(error);
    },
    useErrorBoundary: false,
    onSuccess: () => {
      queryClient.invalidateQueries(["shoes"]);
      navigate("/items")
    },
  });

  return (
    <Layout>
      <h1>Add Shoe</h1>
      {<EditItemForm onSubmit={mutateAsync} />}
    </Layout>
  );
};
