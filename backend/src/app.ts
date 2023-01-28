import { json } from "body-parser";
import cookieSession from "cookie-session";
import express from "express";
import "express-async-errors";
import { v1Router } from "./routes/v1";
import { errorHandler, NotFoundError } from "./utilities";
import { env } from "./utilities/env";

const app = express();
app.set("trust proxy", true);

app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: env.nodeEnv !== "development", // Only over HTTPS
  })
);

app.use("/api/v1", v1Router);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };

