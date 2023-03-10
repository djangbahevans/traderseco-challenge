import { axios } from "../../../libs/axios";
import { User } from "../types";

export const getCurrentUser = async () =>
  await axios.get<{ currentUser: User }>("/users/currentuser");
