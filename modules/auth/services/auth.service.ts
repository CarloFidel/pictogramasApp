import { pictoApi } from "@/config/api-picto/api-picto.config";
import * as axios from "axios";
import { UserLogin, UserRegister } from "../interfaces/User.interface";

export interface AuthResponse {
  name: string;
  email: string;
  token: string;
}

export const register = async (data: UserRegister) => {
  try {
    const response = await pictoApi.post("/auth/register", {
      ...data,
      roles: data.roles?.length ? [data.roles] : ["user"],
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data?.message || "Error en register";
    }

    throw `Problem with registration ${error}`;
  }
};

export const login = async (data: UserLogin) => {
  try {
    const response = await pictoApi.post("/auth/login", data);

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data?.message || "Error en login";
    }
    throw `Problem with login ${error}`;
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

export const deleteUser = async (token: string) => {
  try {
    const response = await pictoApi.delete(`/auth/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Error borrando user");
    }
    throw new Error(`Problem borrando usuario`);
  }
};
