import express, { Request, Response } from "express";
import { Shoe } from "../../../models/item";
import {
  NotFoundError,
  requireAuth,
  validateRequest,
} from "../../../utilities";

const router = express.Router();

router.get(
  "/:id",
  requireAuth,
  validateRequest,
  async (req: Request, res: Response) => {
    const shoe = await Shoe.findById(req.params.id);

    if (!shoe) {
      throw new NotFoundError();
    }

    res.status(201).send(shoe);
  }
);

export { router as getItemRouter };
