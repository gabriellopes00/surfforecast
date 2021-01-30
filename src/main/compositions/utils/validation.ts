import { Validation } from '@src/implementation/validation/interfaces/validation'
import { RequiredFieldsValidation } from '@src/implementation/validation/validators/required-fields-validation'
import { ValidationCompositor } from '@src/implementation/validation/validators/validation-compositor'

export const makeValidation = (fields: string[]): ValidationCompositor => {
  const validations: Validation[] = []
  validations.push(new RequiredFieldsValidation(fields))

  return new ValidationCompositor(validations)
}
