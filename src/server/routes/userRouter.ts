import express from "express";
import { validate } from "express-validation";
import { getRegister, userLogin } from "../controllers/UserController";
import userCredentialSchema from "../schemas/userCredentialSchema";

const userRouter = express.Router();

userRouter.post(
  "/register",
  validate(userCredentialSchema, {}, { abortEarly: false }),
  getRegister
);

userRouter.post("/login", userLogin);

export default userRouter;
