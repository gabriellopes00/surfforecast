import { BcryptAdapter } from '@src/infra/cryptography/bcrypt-adapter'
import { JwtAdapter } from '@src/infra/cryptography/jwt-adapter'
import { MongoUserRepository } from '@src/infra/db/users/user-repository'
import { LoginController } from '@src/presentation/controllers/login'
import { Authentication } from '@src/implementation/usecases/authentication/authentication'

import { secretKey } from '@src/config/env'
import { ValidationCompositor } from '@src/implementation/validation/validators/validation-compositor'
import { RequiredFieldsValidation } from '@src/implementation/validation/validators/required-fields-validation'
import { EmailValidatorAdapter } from '@src/infra/validations/validator-adapter'

const salt = 12
const bcryptAdapter = new BcryptAdapter(salt)
const jwtAdapter = new JwtAdapter(secretKey)
const mongoUserRepository = new MongoUserRepository()

const authenticator = new Authentication(
  mongoUserRepository,
  bcryptAdapter,
  jwtAdapter
)

// Validations composition
const validations = new ValidationCompositor([
  new RequiredFieldsValidation(['email', 'password']),
  new EmailValidatorAdapter()
])

export const loginController = new LoginController(validations, authenticator)
