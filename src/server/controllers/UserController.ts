import "../../loadEnvironment";
import Debug from "debug";
import chalk from "chalk";
import { NextFunction, Request, Response } from "express";
import { UserRegister } from "../../interfaces/interfaces";
import User from "../../database/models/User";
import ErrorCustom from "../../utils/ErrorCustom";
import createHash from "../../utils/auth";

const debug = Debug("destinos:server:controllers:usersControllers");

const getRegister = async (req: Request, res: Response, next: NextFunction) => {
  const user: UserRegister = req.body;

  try {
    user.password = await createHash(user.password);
    const newUser = await User.create(user);
    res.status(201).json({ user: newUser });

    debug(chalk.green("Created newUser"));
  } catch (error) {
    const customError = new ErrorCustom(
      400,
      error.message,
      "Error creating new user"
    );

    next(customError);
  }
};

export default getRegister;
