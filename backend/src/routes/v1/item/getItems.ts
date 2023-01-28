import express, { Request, Response } from "express";
import { query } from "express-validator";
import { SortOrder } from "mongoose";
import { Shoe } from "../../../models/item";
import { validateRequest } from "../../../utilities";

const router = express.Router();

router.get(
  "/",
  [query("sort").optional().isString().withMessage("Sort must be a string"),
    query("page")
      .optional()
      .isInt({ gt: 0 })
      .withMessage("Page must be a positive integer"),
    query("limit")
      .optional()
      .isInt({ gt: 0 })
      .withMessage("Limit must be a positive integer"),
    query("search")
      .optional()
      .isString()
      .withMessage("Search must be a string"),
    query("sizes")
      .optional()
      .isArray()
      .isNumeric()
      .withMessage("Sizes must be an array of numbers"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { sort, page, limit, search, sizes } = req.query;

    const query: { [key: string]: any } = {};

    if (search) {
      query["$text"] = { $search: search };
    }

    if (sizes) {
      query["sizes"] = { $all: sizes };
    }

    const sortOrder: SortOrder =
      sort && (sort as string).split(":")[1] === "desc" ? -1 : 1;

    const sortField = sort && (sort as string).split(":")[0];
    console.log("page: ", page);
    console.log("limit: ", limit);
    console.log((parseInt(page as string) - 1) * parseInt(limit as string));
    const shoes = await Shoe.find(query)
      .sort({ [sortField as string]: sortOrder })
      .skip((parseInt(page as string) - 1) * parseInt(limit as string))
      .limit(parseInt(limit as string));

    res.status(200).send(shoes);
  }
);

export { router as getItemsRouter };
