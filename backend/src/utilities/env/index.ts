import * as dotenv from "dotenv";

dotenv.config();

export const env = {
  jwtKey: process.env.JWT_KEY!,
  mongoUri: process.env.MONGO_URI!,
  nodeEnv: process.env.NODE_ENV!,
};
