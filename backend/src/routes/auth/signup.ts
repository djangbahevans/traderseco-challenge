import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { User } from "../../models/user";
import { validateRequest, BadRequestError } from "../../utilities";
import { env } from "../../utilities/env";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
    body("firstName").trim().notEmpty().withMessage("First name is required"),
    body("lastName").trim().notEmpty().withMessage("Last name is required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password, firstName, lastName } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

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

    // store it on the session object
    req.session = { jwt: usertJwt };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
