import { NextFunction, Request, Response } from "express"
import { validationResult } from "express-validator";
import { RequestValidationError } from "../errors";

// This middleware is used to validate the request body
// and query parameters against the validation rules
// defined in the route handlers.
export const  validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)

  if (!errors.isEmpty())
    throw new RequestValidationError(errors.array());

  next()
}
