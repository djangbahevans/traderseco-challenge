import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Shoe } from "../../../models/item";
import {
  requireAuth,
  validateRequest,
  NotFoundError,
  NotAuthorizedError,
} from "../../../utilities";

const router = express.Router();

router.put(
  "/:id",
  requireAuth,
  // Validate the request body for required fields
  [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
    body("description").not().isEmpty().withMessage("Description is required"),
    body("manufacturer")
      .not()
      .isEmpty()
      .withMessage("Manufacturer is required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    // Find the shoe by id
    const shoe = await Shoe.findById(req.params.id);

    // If the shoe is not found, throw a NotFoundError
    if (!shoe) {
      throw new NotFoundError();
    }

    // Check if the authenticated user is the owner of the shoe
    if (shoe.ownerId.toString() !== req.user!.id) {
      throw new NotAuthorizedError();
    }

    // Update the shoe with the new data
    shoe.set({ ...req.body, ownerId: req.user!.id });
    await shoe.save();

    // Send the updated shoe as the response
    res.status(201).send(shoe);
  }
);

export { router as updateItemRouter };
