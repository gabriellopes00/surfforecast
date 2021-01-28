import Mongoose from 'mongoose'
import { Response } from 'express'
import { VALIDATION } from '../../infra/db/users/user-model'

export abstract class BaseController {
  protected sendResponseError(
    res: Response,
    error: Mongoose.Error.ValidationError | Error
  ): void {
    if (error instanceof Mongoose.Error.ValidationError) {
      const clientErrors = this.handleClientErrors(error)
      res
        .status(clientErrors.code)
        .send({ code: clientErrors.code, error: clientErrors.error })
    } else {
      res.status(500).send({ code: 500, error: 'Something went wrong!' })
    }
  }

  private handleClientErrors(
    error: Mongoose.Error.ValidationError
  ): { code: number; error: string } {
    const duplicatedKindErrors = Object.values(error.errors).filter(
      err => err.kind === VALIDATION.DUPLICATED
    )
    if (duplicatedKindErrors.length) {
      return { code: 409, error: error.message }
    }
    return { code: 422, error: error.message }
  }
}
