import { Authenticator } from '@src/domain/usecases/users/authentication'
import { Validation } from '@src/implementation/validation/interfaces/validation'
import { RequiredFieldsValidation } from '@src/implementation/validation/validators/required-fields-validation'
import { ValidationCompositor } from '@src/implementation/validation/validators/validation-compositor'
import { BcryptAdapter } from '@src/infra/cryptography/bcrypt-adapter'
import { JwtAdapter } from '@src/infra/cryptography/jwt-adapter'
import { MongoUserRepository } from '@src/infra/db/users/user-repository'
import { LoginController } from '@src/presentation/controllers/login'
import { Authentication } from '@src/implementation/usecases/authentication/authentication'

import { secretKey } from '@src/config/env'
import { makeValidation } from '../utils/validation'

const makeAuthentication = (): Authenticator => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(secretKey)
  const mongoUserRepository = new MongoUserRepository()

  return new Authentication(mongoUserRepository, bcryptAdapter, jwtAdapter)
}

const validations = makeValidation(['email', 'password'])

export const loginController = new LoginController(
  validations,
  makeAuthentication()
)
