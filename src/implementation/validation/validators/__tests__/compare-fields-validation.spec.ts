import { InvalidParamError } from '../../../../presentation/errors/invalid-param-error'
import { CompareFieldsValidation } from '../compare-fields-validation'

describe('CompareFields Validation', () => {
  const sut = new CompareFieldsValidation('field', 'fieldToCompare')

  it('Should return an InvalidParamError if validation fails', () => {
    const error = sut.validate({
      field: 'any_field',
      fieldToCompare: 'wrong_field'
    })
    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })

  it('Should not return if validation succeeds', () => {
    const error = sut.validate({
      field: 'any_field',
      fieldToCompare: 'any_field'
    })
    expect(error).toBeFalsy()
  })
})
