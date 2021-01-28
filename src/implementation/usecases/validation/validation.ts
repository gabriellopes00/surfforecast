import { AddUserModel } from '@src/domain/usecases/users/add-user'
import { Validation } from '@src/implementation/interfaces/validation/validation'

export class UserValidation implements Validation {
  validate(data: AddUserModel): boolean {
    return !!(data.name, data.email, data.password)
  }
}
