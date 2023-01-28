import { axios } from "../../../libs/axios";
import { Item } from "../types";

export const getShoes = async (): Promise<Item[]> => {
  const { data } = await axios.get<Item[]>("/shoes");
  return data;
}
