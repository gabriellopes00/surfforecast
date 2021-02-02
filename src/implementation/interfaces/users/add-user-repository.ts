import { UserModel } from '@src/domain/models/user'
import { AddUserModel } from '@src/domain/models/user'

export interface AddUserRepository {
  add(userData: AddUserModel): Promise<UserModel>
}
