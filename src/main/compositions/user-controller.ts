import { CompareFieldsValidation } from '../../implementation/validation/validators/compare-fields-validation'
import { DbAddUser } from '../../implementation/usecases/users/db-add-user'
import { RequiredFieldsValidation } from '../../implementation/validation/validators/required-fields-validation'
import { ValidationCompositor } from '../../implementation/validation/validators/validation-compositor'
import { MongoUserRepository } from '../../infra/db/users/user-repository'
import { UsersController } from '../../presentation/controllers/users'

const mognoUserRepository = new MongoUserRepository()
const dbAddUser = new DbAddUser(mognoUserRepository, mognoUserRepository)

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
