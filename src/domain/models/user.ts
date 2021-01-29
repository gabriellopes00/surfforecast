export interface UserModel {
  id: string
  name: string
  email: string
  password: string
}

export interface AddUserModel extends Omit<UserModel, 'id'> {}

export interface LoggedUserModel extends UserModel {
  token: string
}

export interface AuthenticationModel
  extends Pick<LoggedUserModel, 'email' | 'password'> {}
