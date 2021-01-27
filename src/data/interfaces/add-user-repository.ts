import { UserModel } from '@src/domain/models/user'
import { AddUserModel } from '../../domain/usecases/add-user'

export interface AddUserRepository {
  add(beachData: AddUserModel): Promise<UserModel>
}
