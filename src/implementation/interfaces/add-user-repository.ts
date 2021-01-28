import { UserModel } from '@src/domain/models/user'
import { AddUserModel } from '../../domain/usecases/users/add-user'

export interface AddUserRepository {
  add(beachData: AddUserModel): Promise<UserModel>
}
