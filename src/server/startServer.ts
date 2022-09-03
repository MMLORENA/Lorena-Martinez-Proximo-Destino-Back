import "../loadEnvironment";
import Debug from "debug";
import chalk from "chalk";
import app from ".";
import ErrorCustom from "../utils/Error/ErrorCustom";

const debug = Debug("destinos:server:startServer");

const startServer = (port: number) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.green(`Server listening on port http://localhost:${port}`));
      resolve(true);
    });

    server.on("error", (error: ErrorCustom) => {
      debug(chalk.red("Error starting the server", error.message));
      if (error.code === "EADDRINUSE") {
        debug(chalk.red(`Port ${port} in use`));
      }
      reject(error);
    });
  });

export default startServer;
