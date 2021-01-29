import { MissingParamError } from '@src/presentation/errors/missing-param-error'
import { Validation } from '../../interfaces/validation'
import { ValidationCompositor } from '../validation-compositor'

class ValidationStub implements Validation {
  validate(input: any): Error {
    return null
  }
}

interface SutTypes {
  sut: ValidationCompositor
  validationStubs: Validation[]
}

const makeSut = (): SutTypes => {
  const validationStubs = [new ValidationStub(), new ValidationStub()]
  const sut = new ValidationCompositor(validationStubs)

  return { sut, validationStubs }
}

describe('Validation Composite', () => {
  test('Should return an error if any validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest
      .spyOn(validationStubs[0], 'validate')
      .mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ field: 'any_field' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should return the first error if more than one validation fails', () => {
    const { sut, validationStubs } = makeSut()

    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new Error())
    jest
      .spyOn(validationStubs[1], 'validate')
      .mockReturnValueOnce(new MissingParamError('field'))

    const error = sut.validate({ field: 'any_field' })
    expect(error).toEqual(new Error())
  })

  test('Should not return if validation succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({ field: 'any_field' })
    expect(error).toBeFalsy()
  })
})
