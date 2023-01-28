import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { User } from "../../../models/user";
import { validateRequest, BadRequestError } from "../../../utilities";
import { env } from "../../../utilities/env";

const router = express.Router();

router.post(
  "/signup",
  [
    // Validate the email field, must be a valid email
    body("email").isEmail().withMessage("Email must be valid"),
    // Validate the password field, must be between 4 and 20 characters
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
    // Validate the firstName field, must not be empty
    body("firstName").trim().notEmpty().withMessage("First name is required"),
    // Validate the lastName field, must not be empty
    body("lastName").trim().notEmpty().withMessage("Last name is required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password, firstName, lastName } = req.body;

    // Check if a user with the given email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

    // Create a new user
    const user = User.build({ email, password, firstName, lastName });
    await user.save();

    // Generate JWT
    const usertJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      env.jwtKey,
      {
        expiresIn: "15m",
      }
    );

    // Store it on the session object
    req.session = { jwt: usertJwt };

    // Send back the newly created user and the JWT
    res.status(201).send({ user, token: usertJwt });
  }
);

export { router as signupRouter };
