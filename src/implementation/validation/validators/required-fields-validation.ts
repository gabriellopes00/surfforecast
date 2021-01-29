import { Validation } from '@src/implementation/validation/interfaces/validation'
import { MissingParamError } from '@src/presentation/errors/missing-param-error'

export class RequiredFieldsValidation implements Validation {
  constructor(private readonly fields: string[]) {}

  validate(data: any): Error {
    for (const field of this.fields) {
      if (!data[field]) return new MissingParamError(field)
    }
  }
}
