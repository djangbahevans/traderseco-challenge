import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Shoe } from "../../../models/item";
import { requireAuth, validateRequest } from "../../../utilities";

const router = express.Router();

router.post(
  "/",
  requireAuth,
  [
    //Validate that the name field is not empty
    body("name").not().isEmpty().withMessage("Name is required"),
    //Validate that the description field is an optional string
    body("description")
      .optional()
      .isString()
      .withMessage("Description must be a string"),
    //Validate that the manufacturer field is not empty
    body("manufacturer")
      .not()
      .isEmpty()
      .withMessage("Manufacturer is required"),
    //Validate that the sizes field is an array of numeric values
    body("sizes")
      .isArray()
      .isNumeric()
      .withMessage("Sizes must be an array of numbers"),
    //Validate that the price field is a float greater than 0
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
  ],
  //Middleware function that checks if there are any validation errors
  validateRequest,
  async (req: Request, res: Response) => {
    //Create a new Shoe instance and set the ownerId to the current user
    const shoe = Shoe.build({ ...req.body, ownerId: req.user!.id });
    await shoe.save();

    //Send a 201 status and the new shoe instance as the response
    res.status(201).send(shoe);
  }
);

export { router as createItemRouter };
