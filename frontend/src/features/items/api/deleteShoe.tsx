import { axios } from "../../../libs/axios";

export const deleteShoe = async (id: string) => {
  const { data } = await axios.delete(`/shoes/${id}`);
  return data;
};
