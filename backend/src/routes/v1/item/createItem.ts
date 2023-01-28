import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Shoe } from "../../../models/item";
import { requireAuth, validateRequest } from "../../../utilities";

const router = express.Router();

router.post(
  "/",
  requireAuth,
  [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("description").optional().isString().withMessage("Description must be a string"),
    body("manufacturer")
      .not()
      .isEmpty()
      .withMessage("Manufacturer is required"),
    body("sizes")
      .isArray()
      .isNumeric()
      .withMessage("Sizes must be an array of numbers"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const shoe = Shoe.build({ ...req.body, ownerId: req.user!.id });
    await shoe.save();

    res.status(201).send(shoe);
  }
);

export { router as createItemRouter };
