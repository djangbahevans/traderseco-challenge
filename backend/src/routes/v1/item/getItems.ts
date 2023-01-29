import express, { Request, Response } from "express";
import { query } from "express-validator";
import { SortOrder } from "mongoose";
import { Shoe } from "../../../models/item";
import { validateRequest } from "../../../utilities";

const router = express.Router();

router.get(
  "/",
  [
    // This middleware checks if the 'sort' query parameter is a string, and if not, it sends an error message
    query("sort")
      .optional() // sort query parameter is optional
      .isString() // sort query parameter should be a string
      .withMessage("Sort must be a string"),

    // This middleware checks if the 'page' query parameter is a positive integer, and if not, it sends an error message
    query("page")
      .optional() 
      .isInt({ gt: 0 })
      .withMessage("Page must be a positive integer"),

    // This middleware checks if the 'limit' query parameter is a positive integer, and if not, it sends an error message
    query("limit")
      .optional() 
      .isInt({ gt: 0 })
      .withMessage("Limit must be a positive integer"),

    // This middleware checks if the 'search' query parameter is a string, and if not, it sends an error message
    query("search")
      .optional() 
      .isString() 
      .withMessage("Search must be a string"),
    // This middleware checks if the 'sizes' query parameter is an array of numbers, and if not, it sends an error message
    query("sizes")
      .optional() 
      .isArray() 
      .isNumeric() 
      .withMessage("Sizes must be an array of numbers"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    // Destructure the query parameters from the request object
    const { sort, search, sizes } = req.query;
    let { page, limit } = req.query;

    // If page and limit are not provided, set default values
    if (!page) page = "1";
    if (!limit) limit = "10";

    // Initialize an empty query object
    const query: { [key: string]: any } = {};

    // If search is provided, add text search to the query
    if (search) {
      query["$text"] = { $search: search };
    }

    // If sizes is provided, add size filter to the query
    if (sizes) {
      query["sizes"] = { $all: sizes };
    }

    // Determine sort order based on query parameter
    const sortOrder: SortOrder =
      sort && (sort as string).split(":")[1] === "desc" ? -1 : 1;

    // Determine sort field based on query parameter
    const sortField = sort && (sort as string).split(":")[0];

    // Retrieve shoes from the database based on query, sort, skip, and limit options
    const shoes = await Shoe.find(query)
      .sort({ [sortField as string]: sortOrder })
      .skip((parseInt(page as string) - 1) * parseInt(limit as string))
      .limit(parseInt(limit as string));

    // Send the retrieved shoes as a response
    res.status(200).send(shoes);
  }
);

export { router as getItemsRouter };
