import * as axios from "axios";
import { User } from "../interfaces/User.interface";
import { movieMate } from "./api/api-movie-mate";

export interface AuthResponse {
  fullName: string;
  email: string;
  token: string;
}

export const register = async (data: User) => {
  try {
    const response = await movieMate.post("/auth/register", data);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Error en register");
    }

    throw new Error(`Problem with registration ${error}`);
  }
};

export const login = async (data: User) => {
  try {
    const response = await movieMate.post("/auth/login", data);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Error en login");
    }

    throw new Error(`Problem with login ${error}`);
  }
};

export const getOneUserbyId = async (id: string, token: string) => {
  try {
    const response = await movieMate.get(`auth/user/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Error buscando user");
    }
    throw new Error(`Problem buscando usuario con ${id}`);
  }
};

export const deleteUser = async (id: string, token: string) => {
  try {
    const response = await movieMate.delete(`auth/user/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Error borrando user");
    }
    throw new Error(`Problem borrando usuario con el id ${id}`);
  }
};
