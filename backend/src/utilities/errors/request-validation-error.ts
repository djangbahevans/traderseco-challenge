import { ValidationError } from "express-validator"
import { CustomError } from "./custom-error"


export class RequestValidationError extends CustomError {
  statusCode = 400

  constructor(public errors: ValidationError[]) {
    super("Invalid request parameters")

    // Only because we're extending a builtin class
    Object.setPrototypeOf(this, RequestValidationError.prototype)
  }

  serializeErrors() {
    const formattedError = this.errors.map(error => {
      return { message: error.msg, field: error.param }
    })

    return formattedError
  }

}
