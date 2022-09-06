import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { CustomJwtPayload } from "../../interfaces/interfaces";

const secret = process.env.SECRET;

export const createHash = (paswordText: string) => {
  const salt = 10;
  return bcrypt.hash(paswordText, salt);
};

export const hashCompare = (passwordText: string, hash: string) =>
  bcrypt.compare(passwordText, hash);

export const createToken = (payload: CustomJwtPayload) =>
  jwt.sign(payload, secret);

export const verifyToken = (token: string) =>
  jwt.verify(token, process.env.SECRET);
