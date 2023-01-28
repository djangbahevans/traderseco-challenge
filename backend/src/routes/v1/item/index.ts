import express from "express";
import { createItemRouter } from "./createItem";
import { deleteItemRouter } from "./deleteItem";
import { getAllItemsRouter } from "./getAllItems";
import { updateItemRouter } from "./updateItem";
import {userItemsRouter} from "./userItems";

const router = express.Router();

router.use(createItemRouter);
router.use(deleteItemRouter);
router.use(getAllItemsRouter);
router.use(updateItemRouter);
router.use(userItemsRouter);

export { router as itemRouter };
