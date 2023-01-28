import { axios } from "../../../libs/axios";
import { LoginCredentials, User } from "../types";

export const loginWithEmailAndPassword = async (
  credentials: LoginCredentials
) => {
  console.log("loginWithEmailAndPassword", credentials);
  return await axios.post<User>("/users/signin", credentials)
}
