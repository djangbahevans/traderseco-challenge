import express, { Request, Response } from "express";
import { body, query } from "express-validator";
import jwt from "jsonwebtoken";
import { Shoe } from "../../models/item";
import { validateRequest } from "../../utilities";

const router = express.Router();

router.get(
  "api/v1/shoes",
  [
    query("sort").optional().isString().withMessage("Sort must be a string"),
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
    let query = Shoe.find({});

    if (req.query.sort) {
      const s = req.query.sort as string;
      const sortBy = s.split(",").join(" ");

      query = query.sort(sortBy);
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const startIndex = (page - 1) * limit;
    query = query.skip(startIndex).limit(limit);

    const shoes = await query.exec();

    res.status(200).send(shoes);
  }
);

export { router as getAllItemsRouter };
