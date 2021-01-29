import { AuthenticationModel } from '../../../domain/models/user'

export interface Authenticator {
  authenticate(data: AuthenticationModel): Promise<string>
}
