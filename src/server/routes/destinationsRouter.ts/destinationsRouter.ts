import express from "express";
import { validate } from "express-validation";
import multer from "multer";

import {
  createDestination,
  deleteDestination,
  getDestinationById,
  getUserDestinations,
} from "../../controllers/DestinationController/DestinationController";
import resizeImage from "../../middlewares/resizeImages/resizeImages";
import storageSupabase from "../../middlewares/storageImages/storageSupabase";
import userAuthentication from "../../middlewares/userAuthentication/userAuthentication";
import createDestinationValidation from "../../schemas/destinationsCredentialSchema";

const upload = multer({ dest: "uploads/", limits: { fileSize: 5000000 } });

const destinationsRouter = express.Router();
destinationsRouter.get("/", userAuthentication, getUserDestinations);
destinationsRouter.get(
  "/:idDestination",
  userAuthentication,
  getDestinationById
);
destinationsRouter.delete(
  "/delete/:idDestination",
  userAuthentication,
  deleteDestination
);
destinationsRouter.post(
  "/create",
  userAuthentication,
  upload.single("image"),
  resizeImage,
  storageSupabase,
  validate(createDestinationValidation, {}, { abortEarly: false }),
  createDestination
);

export default destinationsRouter;
