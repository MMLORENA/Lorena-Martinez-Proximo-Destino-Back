import chalk from "chalk";
import { debug } from "console";
import { NextFunction, Request, Response } from "express";
import ErrorCustom from "../../utils/ErrorCustom";

export const generalError = (
  error: ErrorCustom,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  const errorCode = error.code;
  const status = error.statusCode ?? 500;
  const errorPublicMessage = error.publicMessage ?? "General error";
  const errorPrivateMessage = error.privateMessage;

  debug(chalk.bgRedBright(errorPrivateMessage, errorCode));

  res.status(status).json({ error: errorPublicMessage });
};

export const notFoundEndpoint = (req: Request, res: Response) => {
  debug(chalk.bgRed("Request to endpoint not found"));

  res.status(404).json({ error: "Endpoint not found" });
};
