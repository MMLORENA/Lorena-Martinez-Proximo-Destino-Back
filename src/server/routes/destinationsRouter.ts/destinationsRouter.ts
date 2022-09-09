import express from "express";
import { validate } from "express-validation";
import multer from "multer";

import {
  createDestination,
  deleteDestination,
  getUserDestinations,
} from "../../controllers/DestinationController/DestinationController";
import getParseJson from "../../middlewares/getParseJson/getParseJson";
import storageImages from "../../middlewares/storageImages/storageImages";
import userAuthentication from "../../middlewares/userAuthentication/userAuthentication";
import createDestinationValidation from "../../schemas/destinationsCredentialSchema";

const upload = multer({ dest: "uploads/", limits: { fileSize: 5000000 } });

const destinationsRouter = express.Router();

destinationsRouter.get("/", userAuthentication, getUserDestinations);
destinationsRouter.delete(
  "/delete/:idDestination",
  userAuthentication,
  deleteDestination
);
destinationsRouter.post(
  "/create/",
  userAuthentication,
  upload.single("image"),
  getParseJson,
  storageImages,
  validate(createDestinationValidation, {}, { abortEarly: false }),
  createDestination
);

export default destinationsRouter;
