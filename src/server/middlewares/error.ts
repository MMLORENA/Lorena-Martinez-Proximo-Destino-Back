import "../../loadEnvironment";
import chalk from "chalk";
import Debug from "debug";
import { NextFunction, Request, Response } from "express";
import { ValidationError } from "express-validation";
import ErrorCustom from "../../utils/ErrorCustom";

const debug = Debug("destinos:server:controllers:usersControllers");

export const generalError = (
  error: ErrorCustom,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  const errorCode = (error as ErrorCustom).code;
  const status = error.statusCode ?? 500;
  let errorPublicMessage = error.publicMessage ?? "General error";
  const errorPrivateMessage = error.privateMessage;

  debug(chalk.bgRedBright(errorPrivateMessage, errorCode));

  if (error instanceof ValidationError) {
    errorPublicMessage = "Wrong data";
    debug(chalk.red("Request validation Error"));

    error.details.body.forEach((errorInfo) => {
      debug(chalk.bgBlue(errorInfo.message));
    });
  }

  res.status(status).json({ error: errorPublicMessage });
};

export const notFoundEndpoint = (req: Request, res: Response) => {
  debug(chalk.bgRed("Request to endpoint not found"));
  res.status(404).json({ error: "Endpoint not found" });
};
