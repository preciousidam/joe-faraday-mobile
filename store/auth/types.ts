import { UserData } from "../user/types";

export interface Request {
  email: string;
  password: string;
}

export interface User {
  csrf_token: string;
  user: {
    authentication_token: string;
  };
}

export interface Password {
  password: string;
  new_password: string;
  new_password_confirm: string;
}

export interface Error {
  errors?: {
    email?: string[];
    password?: string[];
  };
  error?: string;
}

export interface Response {
  meta: { code: number };
  response: User | Error;
}

export interface Auth {
  csrf_token?: string;
  authentication_token: string;
  isLoading: boolean;
  user?: UserData;
}
