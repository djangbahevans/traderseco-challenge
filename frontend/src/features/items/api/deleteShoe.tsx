import { axios } from "../../../libs/axios";
import { Item } from "../types";

export const deleteShoe = async (id: string) => {
  const { data } = await axios.delete(`/shoes/${id}`);
  return data;
};
