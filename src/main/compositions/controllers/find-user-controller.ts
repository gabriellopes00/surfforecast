import { FindUserController } from '@src/presentation/controllers/find-user'
import { JwtAdapter } from '@src/infra/cryptography/jwt-adapter'
import { secretKey } from '@src/config/env'
import { MongoUserRepository } from '@src/infra/db/users/user-repository'
import { DbFindUser } from '@src/implementation/usecases/users/db-find-user'

const decrypter = new JwtAdapter(secretKey)
const loadUser = new MongoUserRepository()
const dbFindUser = new DbFindUser(loadUser)
export const findUserController = new FindUserController(dbFindUser, decrypter)
