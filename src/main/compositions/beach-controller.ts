import { secretKey } from '../../config/env'
import { JwtAdapter } from '../../infra/cryptography/jwt-adapter'
import { DbAddBeach } from '../../implementation/usecases/beaches/db-add-beach'
import { MongoBeachRepository } from '../../infra/db/beaches/beach-repository'
import { BeachController } from '../../presentation/controllers/beaches'
import { Validation } from '@src/implementation/validation/interfaces/validation'
import { RequiredFieldsValidation } from '@src/implementation/validation/validators/required-fields-validation'
import { ValidationCompositor } from '@src/implementation/validation/validators/validation-compositor'

const mongoBeachRepository = new MongoBeachRepository()
const addBeach = new DbAddBeach(mongoBeachRepository)
const decrypter = new JwtAdapter(secretKey)

const makeValidation = (): ValidationCompositor => {
  const validations: Validation[] = []
  validations.push(
    new RequiredFieldsValidation(['name', 'position', 'lat', 'lng'])
  )

  return new ValidationCompositor(validations)
}
export const beachController = new BeachController(
  addBeach,
  decrypter,
  makeValidation()
)
