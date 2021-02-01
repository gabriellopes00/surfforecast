import { InvalidParamError } from '@src/presentation/errors/invalid-param-error'
import { Validation } from '../../interfaces/validation'
import { EmailValidation } from '../email-validation'

class ValidatorStub implements Validation {
  validate(email: string): Error {
    return null
  }
}

const makeSut = () => {
  const validator = new ValidatorStub()
  const sut = new EmailValidation(validator)
  return { sut, validator }
}

describe('Email Validation', () => {
  const fakeEmail = 'gabriellopes@mail.com'

  it('Should call validator with correct values', async () => {
    const { sut, validator } = makeSut()
    const validateSpy = jest.spyOn(validator, 'validate')
    sut.validate({ email: fakeEmail })
    expect(validateSpy).toHaveBeenCalledWith(fakeEmail)
  })

  it('Should return a null if validator succeeds', async () => {
    const { sut } = makeSut()
    const response = sut.validate({ email: fakeEmail })
    expect(response).toBeNull()
  })

  it('Should return a InvalidParamError if validator throws', async () => {
    const { sut, validator } = makeSut()
    jest
      .spyOn(validator, 'validate')
      .mockReturnValueOnce(new InvalidParamError('email'))
    const error = sut.validate({ email: fakeEmail })
    expect(error).toEqual(new InvalidParamError('email'))
  })
})
