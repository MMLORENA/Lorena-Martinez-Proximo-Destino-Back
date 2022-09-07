import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface CustomJwtPayload {
  id: string;
  userName: string;
}

export interface CustomRequest extends Request {
  payload: JwtPayload;
}
