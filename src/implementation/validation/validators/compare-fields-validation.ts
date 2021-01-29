import { InvalidParamError } from '../../../presentation/errors/invalid-param-error'
import { Validation } from '../interfaces/validation'

export class CompareFieldsValidation implements Validation {
  constructor(
    private readonly field: string,
    private readonly fieldToCompare: string
  ) {}

  validate(data: any): Error {
    if (data[this.field] !== data[this.fieldToCompare]) {
      return new InvalidParamError(this.fieldToCompare)
    }
  }
}
