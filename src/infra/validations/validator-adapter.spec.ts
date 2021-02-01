import { ValidatorAdapter } from './validator-adapter'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail(): boolean {
    return true
  }
}))

describe('Validator EmailValidation adapter', () => {
  const sut = new ValidatorAdapter()
  const fakeEmail = 'gabriel@mail.com'
  const errorMessage = 'Received email is not valid'

  it('Should call validator with correct email', () => {
    const validateSpy = jest.spyOn(validator, 'isEmail')
    sut.validate({ email: fakeEmail })
    expect(validateSpy).toHaveBeenCalledWith(fakeEmail)
  })

  it('Should return an Error if validation throws', () => {
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValidEmail = sut.validate({ email: 'invalid@mail.com' })
    expect(isValidEmail).toEqual(Error(errorMessage))
  })

  it('Should return true if validator return true', () => {
    const isValidEmail = sut.validate({ email: fakeEmail })
    expect(isValidEmail).toBeNull()
  })
})
