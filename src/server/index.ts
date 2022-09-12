import express from "express";
import morgan from "morgan";
import cors from "cors";
import { generalError, notFoundEndpoint } from "./middlewares/error/error";
import userRouter from "./routes/userRouter/userRouter";
import destinationsRouter from "./routes/destinationsRouter.ts/destinationsRouter";

const app = express();
app.disable("x-powered-by");

app.use(cors());
app.use(morgan("dev"));
app.use(express.static("uploads"));
app.use(express.json());

app.use("/user", userRouter);
app.use("/destinations", destinationsRouter);

app.use(notFoundEndpoint);
app.use(generalError);

export default app;
