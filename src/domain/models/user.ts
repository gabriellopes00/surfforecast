export interface UserModel {
  id: string
  name: string
  email: string
  password: string
}

export type AddUserModel = Omit<UserModel, 'id'>

export interface LoggedUserModel extends UserModel {
  token: string
}

export type AuthenticationModel = Pick<LoggedUserModel, 'email' | 'password'>
