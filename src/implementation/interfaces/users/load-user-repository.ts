import { UserModel } from '@src/domain/models/user'

export interface LoadUserRepository {
  loadByEmail(email: string): Promise<UserModel>
  loadById(id: string): Promise<UserModel>
}
