import { secretKey } from '../../config/env'
import { JwtAdapter } from '../../infra/cryptography/jwt-adapter'
import { DbAddBeach } from '../../implementation/usecases/beaches/db-add-beach'
import { MongoBeachRepository } from '../../infra/db/beaches/beach-repository'
import { BeachController } from '../../presentation/controllers/beaches'

const mongoBeachRepository = new MongoBeachRepository()
const addBeach = new DbAddBeach(mongoBeachRepository)
const decrypter = new JwtAdapter(secretKey)
export const beachController = new BeachController(addBeach, decrypter)
