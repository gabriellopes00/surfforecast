import { AddUserModel } from '@src/domain/usecases/users/add-user'

export interface Validation {
  validate(data: AddUserModel): boolean
}
