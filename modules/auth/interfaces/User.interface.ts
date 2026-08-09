export interface UserRegister {
  name: string;
  lastName: string;
  email: string;
  password: string;
  roles?: string[];
}

export interface UserLogin {
  email: string;
  password: string;
}
