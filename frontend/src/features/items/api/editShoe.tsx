import { axios } from "../../../libs/axios";

export type EditItemInputs = {
  name: string;
  description: string;
  manufacturer: string;
  price: number;
  image: string;
  sizes: number[];
};

export const editShoe = async (id: string, data: EditItemInputs) => {
  const res = await axios.put(`/shoes/${id}`, data);
  return res.data;
};
