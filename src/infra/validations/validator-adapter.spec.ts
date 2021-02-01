import { EmailValidatorAdapter } from './validator-adapter'
import validator from 'validator'
import { InvalidParamError } from '@src/presentation/errors/invalid-param-error'

jest.mock('validator', () => ({
  isEmail(): boolean {
    return true
  }
}))

describe('Validator EmailValidation adapter', () => {
  const sut = new EmailValidatorAdapter()
  const fakeEmail = 'gabriel@mail.com'

  it('Should call validator with correct email', () => {
    const validateSpy = jest.spyOn(validator, 'isEmail')
    sut.validate({ email: fakeEmail })
    expect(validateSpy).toHaveBeenCalledWith(fakeEmail)
  })

  it('Should return an Error if validation throws', () => {
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValidEmail = sut.validate({ email: 'invalid@mail.com' })
    expect(isValidEmail).toEqual(new InvalidParamError('email'))
  })

  it('Should return true if validator return true', () => {
    const isValidEmail = sut.validate({ email: fakeEmail })
    expect(isValidEmail).toBeNull()
  })
})
