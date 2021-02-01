import { InvalidParamError } from '@src/presentation/errors/invalid-param-error'
import { Validation } from '../interfaces/validation'

export class EmailValidation implements Validation {
  constructor(private readonly validator: Validation) {}

  validate(data: any): Error {
    const error = this.validator.validate(data['email'])
    if (error) return new InvalidParamError('email')

    return null
  }
}
