import express, { Request, Response } from "express";
import { Shoe } from "../../../models/item";
import { NotFoundError, validateRequest } from "../../../utilities";

const router = express.Router();

router.get("/:id", validateRequest, async (req: Request, res: Response) => {
  // Find the shoe by its id
  const shoe = await Shoe.findById(req.params.id);

  // If the shoe is not found, throw a NotFoundError
  if (!shoe) {
    throw new NotFoundError();
  }

  // Send the found shoe with a status of 201
  res.status(201).send(shoe);
});

export { router as getItemRouter };
