import "../../../loadEnvironment";
import Debug from "debug";
import chalk from "chalk";
import { NextFunction, Response } from "express";
import User from "../../../database/models/User";
import ErrorCustom from "../../../utils/Error/ErrorCustom";
import { CustomRequest } from "../../../interfaces/interfaces";
import Destination from "../../../database/models/Destination";

const debug = Debug("destinos:server:controllers:usersDestinations");

export const getUserDestinations = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.payload;

  try {
    const { destinations } = await User.findOne({ _id: id }).populate({
      path: "destinations",
      model: Destination,
    });

    res.status(200).json({ destinations });
    debug(chalk.green("Request user destinations"));
  } catch (error) {
    const mongooseError = new ErrorCustom(
      404,
      error.message,
      "Error getting list of destinations"
    );
    next(mongooseError);
  }
};

export const deleteDestination = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { idDestination } = req.params;
  const { id } = req.payload;

  try {
    await Destination.findByIdAndDelete({ _id: idDestination });

    await User.findOneAndUpdate(
      { _id: id },
      {
        $pull: { destinations: idDestination },
      }
    );
    res.status(200).json({ message: "Destination has been deleted" });
  } catch (error) {
    const customError = new ErrorCustom(
      400,
      error.message,
      "Error deleting destination"
    );
    next(customError);
  }
};
