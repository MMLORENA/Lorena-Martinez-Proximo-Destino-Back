import { NextFunction, Response } from "express";
import path from "path";
import sharp from "sharp";
import { CustomRequest } from "../../../interfaces/interfaces";
import ErrorCustom from "../../../utils/Error/ErrorCustom";

const resizeImage = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { filename, originalname } = req.file;

  try {
    await sharp(path.join("uploads", filename))
      .resize({
        height: 840,
        width: 600,
        fit: "cover",
      })
      .webp({ quality: 90 })
      .toFile(path.join("uploads", `_${originalname}.webp`));

    req.file.filename = `_${originalname}.webp`;

    next();
  } catch (error) {
    const customError = new ErrorCustom(
      500,
      "Could not process image",
      error.message
    );

    next(customError);
  }
};

export default resizeImage;
