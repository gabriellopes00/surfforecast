import { Hasher } from '@src/implementation/interfaces/users/hasher'
import { hash } from 'bcrypt'

export class BcryptAdapter implements Hasher {
  constructor(private readonly salt: number) {}

  async hash(value: string): Promise<string> {
    return await hash(value, this.salt)
  }
}
