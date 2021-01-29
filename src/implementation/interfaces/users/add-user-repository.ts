import { UserModel } from '@src/domain/models/user'
import { AddUserModel } from '../../../domain/usecases/users/add-user'

export interface AddUserRepository {
  add(userData: AddUserModel): Promise<UserModel>
}
