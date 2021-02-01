import { secretKey } from '@src/config/env'
import { JwtAdapter } from '@src/infra/cryptography/jwt-adapter'
import { DbAddBeach } from '@src/implementation/usecases/beaches/db-add-beach'
import { MongoBeachRepository } from '@src/infra/db/beaches/beach-repository'
import { BeachController } from '@src/presentation/controllers/beaches'
import { ValidationCompositor } from '@src/implementation/validation/validators/validation-compositor'
import { RequiredFieldsValidation } from '@src/implementation/validation/validators/required-fields-validation'
import { EmailValidatorAdapter } from '@src/infra/validations/validator-adapter'

// Database composition
const mongoBeachRepository = new MongoBeachRepository()
const addBeach = new DbAddBeach(mongoBeachRepository)

// cryptography composition
const decrypter = new JwtAdapter(secretKey)

// validations composition
const validations = new ValidationCompositor([
  new RequiredFieldsValidation(['name', 'position', 'lat', 'lng']),
  new EmailValidatorAdapter()
])

export const beachController = new BeachController(
  addBeach,
  decrypter,
  validations
)
