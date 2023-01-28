import { axios } from "../../../libs/axios";
import { Item } from "../types";

export const getShoes = async ({
  search,
  signal,
  sort,
  limit,
  page,
}: {
  search?: string;
  signal?: AbortSignal;
  sort?: string;
  limit?: number;
  page?: number;
}) => {
  const { data } = await axios.get<Item[]>("/shoes", {
    params: {
      search,
      limit,
      page,
      sort,
    },
    signal,
  });
  return data;
};
