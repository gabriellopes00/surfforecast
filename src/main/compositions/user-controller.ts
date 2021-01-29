import { CompareFieldsValidation } from '../../implementation/validation/validators/compare-fields-validation'
import { DbAddUser } from '../../implementation/usecases/users/db-add-user'
import { RequiredFieldsValidation } from '../../implementation/validation/validators/required-fields-validation'
import { ValidationCompositor } from '../../implementation/validation/validators/validation-compositor'
import { MongoUserRepository } from '../../infra/db/users/user-repository'
import { UsersController } from '../../presentation/controllers/users'
import { BcryptAdapter } from '../../infra/cryptography/bcrypt-adapter'

const mognoUserRepository = new MongoUserRepository()
const hasher = new BcryptAdapter(12)
const dbAddUser = new DbAddUser(
  hasher,
  mognoUserRepository,
  mognoUserRepository
)

const requiredFieldsValidation = new RequiredFieldsValidation([
  'name',
  'email',
  'password',
  'passwordConfirmation'
])
const compareFieldsValidation = new CompareFieldsValidation(
  'password',
  'passwordConfirmation'
)

const validation = new ValidationCompositor([
  requiredFieldsValidation,
  compareFieldsValidation
])
export const usersController = new UsersController(dbAddUser, validation)
