import { HashComparer } from '@src/implementation/interfaces/cryptography/hash-comparer'
import { Hasher } from '@src/implementation/interfaces/cryptography/hasher'
import { hash, compare } from 'bcrypt'

export class BcryptAdapter implements Hasher, HashComparer {
  constructor(private readonly salt: number) {}

  async hash(value: string): Promise<string> {
    return await hash(value, this.salt)
  }

  async compare(value: string, hash: string): Promise<boolean> {
    const isValid = await compare(value, hash)
    return isValid
  }
}
