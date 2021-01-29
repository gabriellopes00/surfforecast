import { UserModel } from '@src/domain/models/user'
import { AddUser, AddUserModel } from '@src/domain/usecases/users/add-user'
import { LoadUserRepository } from '@src/implementation/interfaces/users/load-user-repository'
import { AddUserRepository } from '../../interfaces/users/add-user-repository'

export class DbAddUser implements AddUser {
  constructor(
    private readonly addUserRepository: AddUserRepository,
    private readonly loadUserRepository: LoadUserRepository
  ) {}

  async add(userData: AddUserModel): Promise<UserModel> {
    const user = await this.loadUserRepository.loadByEmail(userData.email)
    if (user) return null

    return await this.addUserRepository.add(userData)
  }
}
