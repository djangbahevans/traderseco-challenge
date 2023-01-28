import mongoose from "mongoose";
import { env } from "./utilities/env";
import { app } from "./app";

const start = async () => {
  console.log("Starting up...");

  if (!env.jwtKey)
    throw new Error("JWT_KEY environment variable must be defined");

  if (!env.mongoUri)
    throw new Error("JWT_KEY environment variable must be defined");

  try {
    mongoose.set("strictQuery", true);
    mongoose.connect(env.mongoUri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
};

start();
