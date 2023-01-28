import * as jwt from "jsonwebtoken";
import { User } from "../models/user";
import { env } from "../utilities/env";

const { jwtKey } = env;

const createSendToken = (user: any, statusCode: number, res: any) => {};

const signToken = (id: string): string => {
  return jwt.sign({ id }, jwtKey!, { expiresIn: "30d" });
};

exports.signup = async (req: any, res: any) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const user = await User.create({ email, password, firstName, lastName });
    
    const token = signToken(user._id);
    
    res.status(201).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
