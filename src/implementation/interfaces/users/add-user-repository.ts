import { UserModel } from '@src/domain/models/user'
import { AddUserModel } from '../../../domain/models/user'

export interface AddUserRepository {
  add(userData: AddUserModel): Promise<UserModel>
}
