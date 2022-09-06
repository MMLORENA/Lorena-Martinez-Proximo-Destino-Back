import "../../../loadEnvironment";
import Debug from "debug";
import chalk from "chalk";
import { NextFunction, Response } from "express";
import User from "../../../database/models/User";
import ErrorCustom from "../../../utils/Error/ErrorCustom";
import { CustomRequest } from "../../../interfaces/interfaces";
import Destination from "../../../database/models/Destination";

const debug = Debug("destinos:server:controllers:usersDestinations");

const getUserDestinations = async (
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

    if (destinations.length === 0) {
      const errorDestinations = new ErrorCustom(
        404,
        "There isn't destinations availability",
        "Destinations not found"
      );
      next(errorDestinations);
      return;
    }

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

export default getUserDestinations;