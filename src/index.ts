import startServer from "./server/startServer";

const port = +process.env.PORT || 3333;

startServer(port);
