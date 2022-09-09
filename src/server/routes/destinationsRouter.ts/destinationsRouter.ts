import express from "express";

import {
  deleteDestination,
  getUserDestinations,
} from "../../controllers/DestinationController/DestinationController";
import userAuthentication from "../../middlewares/userAuthentication/userAuthentication";

const destinationsRouter = express.Router();

destinationsRouter.get("/", userAuthentication, getUserDestinations);
destinationsRouter.delete(
  "/delete/:idDestination",
  userAuthentication,
  deleteDestination
);

export default destinationsRouter;
