import { NextFunction, Response } from "express";
import fs from "fs/promises";
import path from "path";
import { CustomRequest } from "../../../interfaces/interfaces";
import ErrorCustom from "../../../utils/Error/ErrorCustom";
import superbase from "./superBaseClient";

const storageImages = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { file } = req;
  const storage = superbase.storage.from("mmlore-final-project");

  const newImageName = `${Date.now()}-${file.originalname}`;

  try {
    await fs.rename(
      path.join("uploads", file.filename),
      path.join("uploads", newImageName)
    );

    const readFile = await fs.readFile(path.join("uploads", newImageName));

    const resultUpload = await storage.upload(newImageName, readFile);

    if (resultUpload.error) {
      const supabaseError = new ErrorCustom(
        400,
        resultUpload.error.message,
        "Error uploading image"
      );
      next(supabaseError);
      return;
    }

    const imageUrl = storage.getPublicUrl(newImageName);

    req.body.image = newImageName;
    req.body.backupImage = imageUrl.publicURL;

    next();
  } catch (error) {
    const customError = new ErrorCustom(
      400,
      error.message,
      "Error uploading images"
    );
    next(customError);
  }
};

export default storageImages;
