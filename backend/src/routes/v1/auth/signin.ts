import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { User } from "../../../models/user";
import { Password } from "../../../services/password";
import { validateRequest, BadRequestError } from "../../../utilities";
import { env } from "../../../utilities/env";

const router = express.Router();

router.post(
  "/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Find user with the matching email
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("Invalid credentials");
    }

    // Compare the passwords
    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );
    if (!passwordsMatch) throw new BadRequestError("Invalid credentials");

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
      },
      env.jwtKey
    );

    // Store the jwt on the session object
    req.session = { jwt: userJwt };

    // Send the user and token information as a response
    res.status(200).send({ user: existingUser, token: userJwt });
  }
);

export { router as signinRouter };
