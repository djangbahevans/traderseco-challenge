import { axios } from "../../../libs/axios";
import { Item } from "../types";

export const getShoes = async ({
  search,
  signal,
  sort,
  limit,
  page,
}: {
  search?: string; // optional search parameter to filter the shoes
  signal?: AbortSignal; // optional signal to abort the request
  sort?: string; // optional sort parameter to sort the shoes
  limit?: number; // optional limit parameter to limit the number of shoes returned
  page?: number; // optional page parameter to paginate through the shoes
}) => {
  // Make a GET request to the '/shoes' endpoint with the given parameters
  const { data } = await axios.get<Item[]>("/shoes", {
    params: {
      search,
      limit,
      page,
      sort,
    },
    signal,
  });
  // Return the data (shoes) from the response
  return data;
};

