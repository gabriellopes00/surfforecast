import { MissingParamError } from '@src/presentation/errors/missing-param-error'
import { RequiredFieldsValidation } from '../required-fields-validation'

interface SutTypes {
  sut: RequiredFieldsValidation
  requiredFields: string[]
}
const makeSut = (): SutTypes => {
  const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
  const sut = new RequiredFieldsValidation(requiredFields)
  return { sut, requiredFields }
}

describe('RequiredField Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const { sut } = makeSut()
    const error = sut.validate({
      name: 'any_name',
      email: 'gabriel@mail.com',
      password: '1234'
    })
    expect(error).toEqual(new MissingParamError('passwordConfirmation'))
  })

  test('Should not return if validation succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({
      name: 'any_name',
      email: 'gabriel@mail.com',
      password: '1234',
      passwordConfirmation: '1234'
    })
    expect(error).toBeFalsy()
  })
})
