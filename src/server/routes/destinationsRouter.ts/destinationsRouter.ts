import express from "express";

import {
  createDestination,
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
destinationsRouter.post("/create/", userAuthentication, createDestination);

export default destinationsRouter;
