import express from "express";

import {getUserDestinations} from "../../controllers/DestinationController/DestinationController";
import userAuthentication from "../../middlewares/userAuthentication/userAuthentication";

const destinationsRouter = express.Router();

destinationsRouter.get("/", userAuthentication, getUserDestinations);

export default destinationsRouter;
