import express from "express";
import { authRouter } from "./auth";
import { itemRouter } from "./item";

const router = express.Router();

router.use("users", authRouter);
router.use("items", itemRouter);

export { router as v1Router };
