import { AddUserRepository } from '@src/implementation/interfaces/users/add-user-repository'
import { UserModel } from '@src/domain/models/user'
import { AddUserModel } from '@src/domain/usecases/users/add-user'
import { User, UserSchema } from './user-model'
import { LoadUserRepository } from '@src/implementation/interfaces/users/load-user-repository'

// Tested together functional tests

export class MongoUserRepository
  implements AddUserRepository, LoadUserRepository {
  async add(userData: AddUserModel): Promise<UserModel> {
    const userModel = new User(userData)
    const result = await userModel.save()
    const user: UserModel = {
      name: result.name,
      email: result.email,
      password: result.password,
      id: result.id
    }
    return user
  }

  async loadByEmail(email: string): Promise<UserModel> {
    const user = await User.findOne({ email: email })
    return user
  }
}
