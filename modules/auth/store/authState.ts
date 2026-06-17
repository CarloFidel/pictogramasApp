import { deleteItemAsync, getItem, setItem } from "expo-secure-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { AuthState } from "../interfaces/AuthSate";

export const useAuthState = create(
  persist<AuthState>(
    (set) => ({
      isLoggedIn: false,
      name: "",
      email: "",
      token: "",
      logIn(name, email, token) {
        set((state) => {
          return {
            name,
            email,
            token,
            isLoggedIn: true,
          };
        });
      },
      logOut() {
        set((state) => ({
          ...state,
          token: "",
          name: "",
          email: "",
          isLoggedIn: false,
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
