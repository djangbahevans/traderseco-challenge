import express from "express";
import { createItemRouter } from "./createItem";
import { deleteItemRouter } from "./deleteItem";
import { getItemRouter } from "./getItem";
import { getItemsRouter } from "./getItems";
import { updateItemRouter } from "./updateItem";
import { userItemsRouter } from "./userItems";

const router = express.Router();

router.use(createItemRouter);
router.use(deleteItemRouter);
router.use(getItemsRouter);
router.use(getItemRouter);
router.use(updateItemRouter);
router.use(userItemsRouter);

export { router as itemRouter };
