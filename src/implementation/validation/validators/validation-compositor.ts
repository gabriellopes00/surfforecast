import { Validation } from '../interfaces/validation'

export class ValidationCompositor implements Validation {
  constructor(private readonly validations: Validation[]) {}

  validate(data: any): Error {
    for (const validation of this.validations) {
      const error = validation.validate(data)
      if (error) return error
    }
  }
}
