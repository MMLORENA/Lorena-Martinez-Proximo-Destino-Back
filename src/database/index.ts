import "../loadEnvironment";
import Debug from "debug";
import chalk from "chalk";
import mongoose from "mongoose";
import ErrorCustom from "../utils/ErrorCustom";

const debug = Debug("destinos:database:index");

const connectDB = (mongoUrl: string) =>
  new Promise((resolve, reject) => {
    mongoose.set("toJSON", {
      virtuals: true,
      transform: (doc, ret) => {
        const newDocument = { ...ret };

        // eslint-disable-next-line no-underscore-dangle
        delete newDocument.__v;
        // eslint-disable-next-line no-underscore-dangle
        delete newDocument._id;

        delete newDocument.password;

        return newDocument;
      },
    });

    mongoose.connect(mongoUrl, (error: ErrorCustom) => {
      if (error) {
        debug(
          chalk.red("Error connecting to database", error.message, error.code)
        );
        reject(error);
        return;
      }

      debug(chalk.blue("Connected to database"));
      resolve(true);
    });
  });

export default connectDB;
