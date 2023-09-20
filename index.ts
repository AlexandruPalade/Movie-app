import express from "express";
import morgan from "morgan";

import userRouter from "./routes/user.route";
import movieRouter from "./routes/movie.route";

import { setup } from "./utils/mongoSetup";
import { Config } from "./types";

const config = require("config") as Config;

const { PORT } = config;

// Setup the MongoDB connection
setup();

// Initilize the Express application
const app = express();

// Use morgan for HTTP requests
app.use(morgan("common"));

// Mount the routers at the enpoints
app.use("/user", userRouter);
app.use('/movie', movieRouter);

// Start the Express app and listen on the port 
app.listen(3000);
