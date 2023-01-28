import { axios } from "../../../libs/axios";
import { Item } from "../types";
import { EditItemInputs } from "./editShoe";

export const addShoe = async (data: EditItemInputs) => {
  const res = await axios.post<Item>(`/shoes`, data);
  return res.data;
};
