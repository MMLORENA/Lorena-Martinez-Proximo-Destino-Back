import { NextFunction, Response } from "express";
import { CustomRequest } from "../../../interfaces/interfaces";
import ErrorCustom from "../../../utils/Error/ErrorCustom";

const getParseJson = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { newDestination } = req.body;

    const destinationParsed = await JSON.parse(newDestination);

    req.body = destinationParsed;

    next();
  } catch (error) {
    const newError = new ErrorCustom(
      400,
      (error as Error).message,
      "Something failed while parsing the received data"
    );
    next(newError);
  }
};

export default getParseJson;
