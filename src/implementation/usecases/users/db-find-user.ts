import logger from '@src/config/logger'
import { UserModel } from '@src/domain/models/user'
import { FindUser } from '@src/domain/usecases/users/find-user'
import { LoadUserRepository } from '@src/implementation/interfaces/users/load-user-repository'

export class DbFindUser implements FindUser {
  constructor(private readonly loadUserRepository: LoadUserRepository) {}

  async findById(id: string): Promise<UserModel> {
    return await this.loadUserRepository.loadById(id)
  }
}
