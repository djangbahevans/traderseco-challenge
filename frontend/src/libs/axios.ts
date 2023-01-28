import Axios, { AxiosRequestConfig } from "axios";
import { API_URL } from "../config";
import storage from "../utils/storage";

const authRequestInterceptor = (config: AxiosRequestConfig) => {
  const token = storage.getToken();
  config.headers = config.headers || {};
  if (token) {
    config.headers.Authorization = `${token}`;
  }

  config.headers.Accept = "application/json";
  return config;
};

export const axios = Axios.create({
  baseURL: API_URL
});

axios.interceptors.request.use(authRequestInterceptor);
