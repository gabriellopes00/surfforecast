import { AddUserRepository } from '@src/data/interfaces/add-user-repository'
import { BeachModel } from '@src/domain/models/beach'
import { UserModel } from '@src/domain/models/user'
import { AddUserModel } from '@src/domain/usecases/add-user'
import { User } from './user-model'

// Tested together functional tests

export class MongoUserRepository implements AddUserRepository {
  async add(userData: AddUserModel): Promise<UserModel> {
    const userModel = new User(userData)
    const result = await userModel.save()
    const user: UserModel = {
      name: result.name,
      email: result.email,
      password: result.email,
      id: result.id
    }
    return user
  }
}
