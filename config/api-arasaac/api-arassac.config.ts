import * as axios from "axios";

export const arasaacApi = axios.create({
  baseURL: process.env.EXPO_PUBLIC_ARASAAC_PICTOGRAMS_ALL,
});
