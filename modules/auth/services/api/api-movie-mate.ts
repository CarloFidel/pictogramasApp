import * as axios from "axios";

export const pictoApi = axios.create({
  baseURL: process.env.EXPO_PUBLIC_PICTO_API,
});
