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
    const shoe = await Shoe.findById(req.params.id);

    if (!shoe) {
      throw new NotFoundError();
    }

    if (shoe.ownerId !== req.user!.id) {
      throw new NotAuthorizedError();
    }

    shoe.set({ ...req.body, ownerId: req.user!.id });
    await shoe.save();

    res.status(201).send(shoe);
  }
);

export { router as updateItemRouter };
