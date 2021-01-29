import { DbAddBeach } from '../../implementation/usecases/beaches/db-add-beach'
import { MongoBeachRepository } from '../../infra/db/beaches/beach-repository'
import { BeachController } from '../../presentation/controllers/beaches'

const mongoBeachRepository = new MongoBeachRepository()
const addBeach = new DbAddBeach(mongoBeachRepository)
export const beachController = new BeachController(addBeach)
