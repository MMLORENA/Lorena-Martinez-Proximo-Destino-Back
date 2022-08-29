import express from "express";
import morgan from "morgan";
import cors from "cors";
import { generalError, notFoundEndpoint } from "./middlewares/error";

const app = express();
app.disable("x-powered-by");

app.use(cors());
app.use(morgan("dev"));

app.use(notFoundEndpoint);
app.use(generalError);

export default app;
