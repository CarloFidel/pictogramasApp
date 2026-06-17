import * as axios from "axios";

export const movieMate = axios.create({
  baseURL: "https://moviemate-backend-esve.onrender.com/api",
});
