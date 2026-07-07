import { deleteItemAsync, getItem, setItem } from "expo-secure-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { AuthState } from "../interfaces/AuthSate";

export const useAuthState = create(
  persist<AuthState>(
    (set) => ({
      isLoggedIn: false,
      name: "",
      lastName: "",
      email: "",
      roles: [],
      token: "",
      logIn(name, lastName, email, roles, token) {
        set((state) => {
          return {
            name,
            lastName,
            email,
            roles,
            token,
            isLoggedIn: true,
          };
        });
      },
      logOut() {
        set((state) => ({
          ...state,
          isLoggedIn: false,
          name: "",
          lastName: "",
          email: "",
          roles: [],
          token: "",
        }));
      },
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => ({
        setItem,
        getItem,
        removeItem: deleteItemAsync,
      })),
    },
  ),
);
