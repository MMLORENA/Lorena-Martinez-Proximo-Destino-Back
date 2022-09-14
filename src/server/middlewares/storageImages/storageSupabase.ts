import { NextFunction, Response } from "express";
import path from "path";
import fs from "fs/promises";
import { CustomRequest } from "../../../interfaces/interfaces";
import supabase from "./supabase";

const storageSupabase = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { filename } = req.file;

  const storage = supabase.storage.from("mmlore-final-project");

  const newPictureName = `${Date.now()}-${filename}`;

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
};

export default storageSupabase;
