export interface FormDataRegister {
  name: string;
  lastName: string;
  email: string;
  password: string;
  roles: string[];
}

export interface FormDataLogin {
  email: string;
  password: string;
}
