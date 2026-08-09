export type AuthState = {
  isLoggedIn: boolean;
  name: string;
  lastName: string;
  email: string;
  roles: string[];
  token: string;

  logIn: (
    name: string,
    lastName: string,
    email: string,
    roles: string[],
    token: string,
  ) => void;

  logOut: () => void;
};
