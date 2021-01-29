import { UserModel } from '../../models/user'

export interface LoadUserByEmail {
  loadByEmail(field: object): Promise<UserModel>
}
