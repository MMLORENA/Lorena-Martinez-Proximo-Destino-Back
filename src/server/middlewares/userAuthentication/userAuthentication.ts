import { NextFunction, Response } from "express";
import { CustomRequest } from "../../../interfaces/interfaces";
import { verifyToken } from "../../../utils/auth/auth";
import ErrorCustom from "../../../utils/Error/ErrorCustom";

const userAuthentication = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const customError = new ErrorCustom(
    400,
    "Bad request",
    "User sends bad login"
  );

  const requestAuthentification = req.get("Authorization");

  if (
    !requestAuthentification ||
    !requestAuthentification.startsWith("Bearer ")
  ) {
    next(customError);
    return;
  }

  const token = requestAuthentification.slice(7);
  const userToken = verifyToken(token);

  if (typeof userToken === "string") {
    next(customError);
    return;
  }

  req.payload = userToken;
  next();
};

export default userAuthentication;
