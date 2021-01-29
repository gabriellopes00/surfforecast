import { UserModel } from '@src/domain/models/user'
import { AddUserModel } from '@src/domain/models/user'
import { AddUser } from '@src/domain/usecases/users/add-user'
import { Hasher } from '@src/implementation/interfaces/users/hasher'
import { LoadUserRepository } from '@src/implementation/interfaces/users/load-user-repository'
import { AddUserRepository } from '../../interfaces/users/add-user-repository'

export class DbAddUser implements AddUser {
  constructor(
    private readonly hasher: Hasher,
    private readonly addUserRepository: AddUserRepository,
    private readonly loadUserRepository: LoadUserRepository
  ) {}

  async add(userData: AddUserModel): Promise<UserModel> {
    const user = await this.loadUserRepository.loadByEmail(userData.email)
    if (user) return null

    const hashedPassword = await this.hasher.hash(userData.password)
    return await this.addUserRepository.add(
      Object.assign({}, userData, { password: hashedPassword })
    )
  }
}
