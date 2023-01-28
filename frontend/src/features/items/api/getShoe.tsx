import { axios } from "../../../libs/axios";
import { Item } from "../types";

export const getShoe = async (id: string) => {
  const { data } = await axios.get<Item>(`/shoes/${id}`);
  return data;
};
