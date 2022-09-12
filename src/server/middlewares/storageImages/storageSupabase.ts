import { NextFunction, Response } from "express";
import path from "path";
import fs from "fs/promises";
import { CustomRequest } from "../../../interfaces/interfaces";
import supabase from "./supabase";
import ErrorCustom from "../../../utils/Error/ErrorCustom";

const storageSupabase = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { filename, originalname } = req.file;
    const storage = supabase.storage.from("mmlore-final-project");

    const newPictureName = `${Date.now()}-${originalname}`;

    await fs.rename(
      path.join("uploads", filename),
      path.join("uploads", newPictureName)
    );

    const readFile = await fs.readFile(path.join("uploads", newPictureName));

    await storage.upload(newPictureName, readFile);

    const imageUrl = storage.getPublicUrl(newPictureName);

    req.body.image = newPictureName;
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

export default storageSupabase;
