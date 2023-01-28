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
  "api/v1/shoes/:id",
  requireAuth,
  validateRequest,
  async (req: Request, res: Response) => {
    const shoe = await Shoe.findById(req.params.id);
    if (!shoe) {
      throw new NotFoundError();
    }

    if (shoe.ownerId !== req.user!.id) {
      throw new NotAuthorizedError();
    }

    await shoe.remove();

    res.status(201).send(shoe);
  }
);

export { router as deleteItemRouter };
