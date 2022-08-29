import connectDB from "./database";
import startServer from "./server/startServer";

const port = +process.env.PORT || 3333;

const mongoURL = process.env.MONGO_DB;

(async () => {
  try {
    await connectDB(mongoURL);
    await startServer(port);
  } catch (error) {
    process.exit(1);
  }
})();
