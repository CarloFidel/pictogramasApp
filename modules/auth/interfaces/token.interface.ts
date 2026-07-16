export interface TokenPayload {
  email: string;
  id: string;
  name: string;
  lastName: string;
  roles: string[];
  iat: number;
  exp: number;
}
