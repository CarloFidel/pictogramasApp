export type AuthState = {
  isLoggedIn: boolean;
  name: string;
  email: string;
  token: string;

  logIn: (name: string, email: string, token: string) => void;
  logOut: () => void;
};
