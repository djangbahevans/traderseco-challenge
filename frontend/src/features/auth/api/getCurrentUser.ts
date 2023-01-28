import { axios } from "../../../libs/axios";
import { User } from "../types";

export const getCurrentUser = async () => await axios.get<User>("/users/currentuser");
