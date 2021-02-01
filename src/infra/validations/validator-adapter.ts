import { Validation } from '@src/implementation/validation/interfaces/validation'
import validator from 'validator'

export class ValidatorAdapter implements Validation {
  validate(data: any): Error {
    const isValidEmail = validator.isEmail(data['email'])
    if (!isValidEmail) return new Error('Received email is not valid')
    else return null
  }
}
