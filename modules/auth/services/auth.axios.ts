import { pictoApi } from "@/config/api-picto/api-picto.config";
import * as axios from "axios";
import { User } from "../interfaces/User.interface";

export interface AuthResponse {
  name: string;
  email: string;
  token: string;
}

export const register = async (data: User) => {
  try {
    const response = await pictoApi.post("/auth/register", data);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data?.message || "Error en register";
    }

    throw `Problem with registration ${error}`;
  }
};

export const login = async (data: User) => {
  try {
    const response = await pictoApi.post("/auth/login", data);

    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const getOneUserbyId = async (id: string, token: string) => {
  try {
    const response = await pictoApi.get(`/auth/${id}`, {
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
    const response = await pictoApi.delete(`/auth/${id}`, {
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
