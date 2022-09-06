import express from "express";

import getUserDestinations from "../../controllers/DestinationController/DestinationController";
import userAuthentification from "../../middlewares/userAuthentification";

const destinationsRouter = express.Router();

destinationsRouter.get("/", userAuthentification, getUserDestinations);

export default destinationsRouter;
