import mongoose from "mongoose";
import { app } from "./app";
import * as dotenv from "dotenv";

const start = async () => {
  console.log("Starting up...");
  dotenv.config();

  if (!process.env.JWT_KEY)
    throw new Error("JWT_KEY environment variable must be defined");

  if (!process.env.MONGO_URI)
    throw new Error("JWT_KEY environment variable must be defined");

  try {
    mongoose.set("strictQuery", true);
    mongoose.connect(process.env.MONGO_URI,);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
};

start();
