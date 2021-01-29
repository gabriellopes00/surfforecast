import { Authenticator } from '../../domain/usecases/users/authentication'
import { Validation } from '../../implementation/validation/interfaces/validation'
import { RequiredFieldsValidation } from '../../implementation/validation/validators/required-fields-validation'
import { ValidationCompositor } from '../../implementation/validation/validators/validation-compositor'
import { BcryptAdapter } from '../../infra/cryptography/bcrypt-adapter'
import { JwtAdapter } from '../../infra/cryptography/jwt-adapter'
import { MongoUserRepository } from '../../infra/db/users/user-repository'
import { LoginController } from '../../presentation/controllers/login'
import { Authentication } from '../../implementation/usecases/authentication/authentication'

import { secretKey } from '../../config/env'

const makeLoginValidation = (): ValidationCompositor => {
  const validations: Validation[] = []
  validations.push(new RequiredFieldsValidation(['email', 'password']))

  return new ValidationCompositor(validations)
}

const makeAuthentication = (): Authenticator => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(secretKey)
  const mongoUserRepository = new MongoUserRepository()

  return new Authentication(mongoUserRepository, bcryptAdapter, jwtAdapter)
}

export const loginController = new LoginController(
  makeLoginValidation(),
  makeAuthentication()
)
