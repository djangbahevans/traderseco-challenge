import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { env } from "../env"

interface IUserPayload {
  id: string
  email: string,
  firstName: string,
  lastName: string,
}

declare global {
  namespace Express {
    interface Request {
      user?: IUserPayload
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("currentUser middleware", req.session)
  if (!req.session?.jwt)
    return next()

  try {
    const payload = jwt.verify(req.session.jwt, env.jwtKey) as IUserPayload
    req.user = payload
  } catch (error) { }

  next()
}
