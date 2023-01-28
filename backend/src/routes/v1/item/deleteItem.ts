import express, { Request, Response } from "express";
import { Shoe } from "../../../models/item";
import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
  validateRequest,
} from "../../../utilities";

const router = express.Router();

router.delete(
  "/:id",
  requireAuth,
  validateRequest,
  async (req: Request, res: Response) => {
    // Find the shoe by its id
    const shoe = await Shoe.findById(req.params.id);
    // If the shoe is not found, throw a NotFoundError
    if (!shoe) {
      throw new NotFoundError();
    }
    // Check if the authenticated user owns the shoe
    if (shoe.ownerId.toString() !== req.user!.id) {
      throw new NotAuthorizedError();
    }
    // Remove the shoe
    await shoe.remove();
    // Send the status 201
    res.status(201);
  }
);

export { router as deleteItemRouter };
