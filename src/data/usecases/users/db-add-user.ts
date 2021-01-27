import { UserModel } from '@src/domain/models/user'
import { AddUser, AddUserModel } from '@src/domain/usecases/add-user'
import { AddUserRepository } from '../../interfaces/add-user-repository'

export class DbAddUser implements AddUser {
  constructor(private readonly addUserRepository: AddUserRepository) {}

  async add(userData: AddUserModel): Promise<UserModel> {
    return await this.addUserRepository.add(userData)
  }
}
