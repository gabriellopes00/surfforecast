import { AuthenticationModel } from '@src/domain/models/user'
import { Authenticator } from '@src/domain/usecases/users/authentication'
import { Encrypter } from '@src/implementation/interfaces/cryptography/encrypter'
import { HashComparer } from '@src/implementation/interfaces/cryptography/hash-comparer'
import { LoadUserRepository } from '@src/implementation/interfaces/users/load-user-repository'

export class Authentication implements Authenticator {
  constructor(
    private readonly loadUserRepository: LoadUserRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter
  ) {}

  async authenticate(data: AuthenticationModel): Promise<string> {
    const user = await this.loadUserRepository.loadByEmail(data.email)
    if (user) {
      const isValid = await this.hashComparer.compare(
        data.password,
        user.password
      )
      if (isValid) {
        const token = await this.encrypter.encrypt(user.id)
        return token
      }
    }
    return null
  }
}
