import express, { Request, Response } from "express";
import { Shoe } from "../../../models/item";
import { validateRequest } from "../../../utilities";

const router = express.Router();

router.get(
  "/:userId",
  [], // No middlewares are needed for this route
  validateRequest, // Validate the request to ensure that userId is provided
  async (req: Request, res: Response) => {
    // Find all shoes that belong to the user with the provided userId
    const shoes = await Shoe.find({ ownerId: req.params.userId });

    // Send a response with a status of 200 and the found shoes
    res.status(200).send(shoes);
  }
);

export { router as userItemsRouter };
