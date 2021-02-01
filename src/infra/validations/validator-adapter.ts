import { Validation } from '@src/implementation/validation/interfaces/validation'
import { InvalidParamError } from '@src/presentation/errors/invalid-param-error'
import validator from 'validator'

export class EmailValidatorAdapter implements Validation {
  validate(data: any): Error {
    const isValidEmail = validator.isEmail(data['email'])
    if (!isValidEmail) return new InvalidParamError('email')
    else return null
  }
}
