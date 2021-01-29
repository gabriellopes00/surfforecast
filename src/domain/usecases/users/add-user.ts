import { AddUserModel, UserModel } from '../../models/user'

export interface AddUser {
  add(userData: AddUserModel): Promise<UserModel>
}
