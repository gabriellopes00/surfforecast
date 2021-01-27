import { UserModel } from '../models/user'

export type AddUserModel = Omit<UserModel, 'id'>
export interface AddUser {
  add(userData: AddUserModel): Promise<UserModel>
}
