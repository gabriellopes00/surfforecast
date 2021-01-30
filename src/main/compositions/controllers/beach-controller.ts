import { secretKey } from '@src/config/env'
import { JwtAdapter } from '@src/infra/cryptography/jwt-adapter'
import { DbAddBeach } from '@src/implementation/usecases/beaches/db-add-beach'
import { MongoBeachRepository } from '@src/infra/db/beaches/beach-repository'
import { BeachController } from '@src/presentation/controllers/beaches'
import { makeValidation } from '../utils/validation'

const mongoBeachRepository = new MongoBeachRepository()
const addBeach = new DbAddBeach(mongoBeachRepository)
const decrypter = new JwtAdapter(secretKey)
const validations = makeValidation(['name', 'position', 'lat', 'lng'])

export const beachController = new BeachController(
  addBeach,
  decrypter,
  validations
)
