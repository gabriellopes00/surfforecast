import { UserModel } from '@src/domain/models/user'
import { AddUser, AddUserModel } from '@src/domain/usecases/users/add-user'
import { AddUserRepository } from '../../interfaces/users/add-user-repository'

export class DbAddUser implements AddUser {
  constructor(private readonly addUserRepository: AddUserRepository) {}

  async add(userData: AddUserModel): Promise<UserModel> {
    return await this.addUserRepository.add(userData)
  }
}
