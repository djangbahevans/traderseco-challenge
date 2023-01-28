import express, { Request, Response } from "express";
import { Shoe } from "../../models/item";
import { validateRequest } from "../../utilities";

const router = express.Router();

router.get(
  "api/v1//shoes/:userId",
  [],
  validateRequest,
  async (req: Request, res: Response) => {
    const shoes = await Shoe.find({ ownerId: req.params.userId });

    res.status(200).send(shoes);
  }
);

export { router as userItemsRouter };
