import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface UserRegister {
  name: string;
  firstName: string;
  secondName?: string;
  userName: string;
  password: string;
  repeatedPassword: string;
}

export interface UserLogin {
  userName: string;
  password: string;
}
export interface CustomJwtPayload {
  id: string;
  userName: string;
}

export interface UserDB extends UserLogin {
  id: string;
  destinations?: [{}];
}

export interface CustomRequest extends Request {
  payload: JwtPayload;
}
