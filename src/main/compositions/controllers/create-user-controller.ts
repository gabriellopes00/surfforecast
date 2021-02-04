import { CompareFieldsValidation } from '@src/implementation/validation/validators/compare-fields-validation'
import { DbAddUser } from '@src/implementation/usecases/users/db-add-user'
import { RequiredFieldsValidation } from '@src/implementation/validation/validators/required-fields-validation'
import { ValidationCompositor } from '@src/implementation/validation/validators/validation-compositor'
import { MongoUserRepository } from '@src/infra/db/users/user-repository'
import { CreateUserController } from '@src/presentation/controllers/create-user'
import { BcryptAdapter } from '@src/infra/cryptography/bcrypt-adapter'
import { EmailValidatorAdapter } from '@src/infra/validations/validator-adapter'

// Database and cryptography composition
const mognoUserRepository = new MongoUserRepository()
const hasher = new BcryptAdapter(12)
const dbAddUser = new DbAddUser(
  hasher,
  mognoUserRepository,
  mognoUserRepository
)

// Validations composition
const validations = new ValidationCompositor([
  new RequiredFieldsValidation([
    'name',
    'email',
    'password',
    'passwordConfirmation'
  ]),
  new CompareFieldsValidation('password', 'passwordConfirmation'),
  new EmailValidatorAdapter()
])

export const createUserController = new CreateUserController(
  dbAddUser,
  validations
)
