import { useMutation, useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { queryClient } from "../../../libs/react-query";
import { EditItemInputs, editShoe } from "../api/editShoe";
import { getShoe } from "../api/getShoe";
import { EditItemForm } from "../components/EditItemForm";
import { Layout } from "../components/Layout";

export const EditItem: FC = () => {
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ["shoes", id],
    queryFn: () => {
      if (!id) return;

      const item = getShoe(id);
      return item;
    },
    onError: (error) => {
      console.error(error);
    },
    useErrorBoundary: false,
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (data: EditItemInputs) => {
      const item = await editShoe(id!, data);
      return item;
    },
    onError: (error) => {
      console.error(error);
    },
    useErrorBoundary: false,
    onSuccess: () => {
      queryClient.invalidateQueries(["shoes"]);
    },
  });

  return (
    <Layout>
      <h1>Edit Shoe</h1>
      {data && <EditItemForm initialValues={data} onSubmit={mutateAsync} />}
    </Layout>
  );
};
