import { Decrypter } from '@src/implementation/interfaces/cryptography/decrypter'
import { Encrypter } from '@src/implementation/interfaces/cryptography/encrypter'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor(private readonly secret: string) {}

  async encrypt(value: string): Promise<string> {
    return jwt.sign({ id: value }, this.secret, { expiresIn: '15m' })
  }

  async decrypt(value: string): Promise<any> {
    return jwt.verify(value, this.secret)
  }
}
