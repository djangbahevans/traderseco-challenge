import { json } from "body-parser";
import cookieSession from "cookie-session";
import express from "express";
import "express-async-errors";
import {
  currentUserRouter,
  signinRouter,
  signoutRouter,
  signupRouter,
} from "./routes/auth";
import {
  createItemRouter,
  deleteItemRouter,
  getAllItemsRouter,
  updateItemRouter,
  userItemsRouter,
} from "./routes/item";
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

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(createItemRouter);
app.use(deleteItemRouter);
app.use(getAllItemsRouter);
app.use(updateItemRouter);
app.use(userItemsRouter);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
