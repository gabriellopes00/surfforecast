import { UserModel } from '@src/domain/models/user'

export interface FindUser {
  findById(id: string): Promise<UserModel>
}
