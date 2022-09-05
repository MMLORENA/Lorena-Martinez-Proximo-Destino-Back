import "../../loadEnvironment";
import Debug from "debug";
import chalk from "chalk";
import { NextFunction, Request, Response } from "express";
import {
  CustomJwtPayload,
  UserDB,
  UserLogin,
  UserRegister,
} from "../../interfaces/interfaces";
import User from "../../database/models/User";
import ErrorCustom from "../../utils/Error/ErrorCustom";
import { createHash, createToken, hashCompare } from "../../utils/auth/auth";

const debug = Debug("destinos:server:controllers:usersControllers");

export const getRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: UserRegister = req.body;

  try {
    user.password = await createHash(user.password);
    await User.create(user);

    res.status(201).json({ message: "User Created" });

    debug(chalk.green("Created newUser"));
  } catch (error) {
    const customError = new ErrorCustom(
      409,
      error.message,
      "Error creating new user"
    );

    next(customError);
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: UserLogin = req.body;
  const userError = new ErrorCustom(
    401,
    "User not found",
    "User or password not valid"
  );

  let findUser: UserDB;

  try {
    findUser = await User.findOne({ userName: user.userName });

    if (!findUser) {
      next(userError);
      return;
    }
  } catch (error) {
    const searchError = new ErrorCustom(
      403,
      (error as Error).message,
      "User or password invalid"
    );
    next(searchError);
    return;
  }

  try {
    const isPasswordValid = await hashCompare(user.password, findUser.password);

    if (!isPasswordValid) {
      userError.privateMessage = "Password invalid";
      next(userError);
      return;
    }
  } catch (error) {
    const passwordError = new ErrorCustom(
      403,
      (error as Error).message,
      "User or password not valid "
    );
    next(passwordError);
    return;
  }

  const payLoad: CustomJwtPayload = {
    id: findUser.id,
    userName: findUser.userName,
  };

  const responseData = {
    user: {
      token: createToken(payLoad),
    },
  };

  res.status(200).json(responseData);
};
