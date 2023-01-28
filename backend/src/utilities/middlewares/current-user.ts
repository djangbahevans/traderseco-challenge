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
  // token should be in the header or in the session
  const token = req.headers?.authorization || req.session?.jwt
  if (!token)
    return next()

  try {
    const payload = jwt.verify(token, env.jwtKey) as IUserPayload
    req.user = payload
  } catch (error) { }

  next()
}
