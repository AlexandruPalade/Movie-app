import mongoose from "mongoose";
import { Config } from "../types";

const config = require("config") as Config;
// Extract the URI from the config environment
const { MONGODB: { URI } } = config;

// Connecting to the DB
export const setup = async() => {
  await mongoose.connect(URI, {dbName: "assignament"});
  console.log("Successfully connected to  the DB")
};
