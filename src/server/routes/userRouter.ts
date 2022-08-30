import express from "express";
import getRegister from "../controllers/UserController";

const userRouter = express.Router();

userRouter.post("/register", getRegister);

export default userRouter;
