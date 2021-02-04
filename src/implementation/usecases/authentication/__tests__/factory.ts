import { AuthenticationModel, UserModel } from '@src/domain/models/user'
import { Encrypter } from '@src/implementation/interfaces/cryptography/encrypter'
import { HashComparer } from '@src/implementation/interfaces/cryptography/hash-comparer'
import { LoadUserRepository } from '@src/implementation/interfaces/users/load-user-repository'
import { Authentication } from '../authentication'

export const fakeUser: UserModel = {
  id: 'any_id',
  name: 'gabriel',
  email: 'gabriel@mail.com',
  password: 'hashed_password'
}

export const fakeAuthentication: AuthenticationModel = {
  email: 'gabriel@mail.com',
  password: '1234'
}

class HashComparerStub implements HashComparer {
  async compare(value: string, hash: string): Promise<boolean> {
    return new Promise((resolve, reject) => resolve(true))
  }
}

class EncrypterStub implements Encrypter {
  async encrypt(value: string): Promise<string> {
    return new Promise((resolve, reject) => resolve('any_token'))
  }
}

class LoadUserRepositoryStub implements LoadUserRepository {
  async loadByEmail(email: string): Promise<UserModel> {
    return new Promise((resolve, reject) => resolve(fakeUser))
  }

  async loadById(id: string): Promise<UserModel> {
    return new Promise((resolve, reject) => resolve(fakeUser))
  }
}

interface SutTypes {
  sut: Authentication
  loadUserRepositoryStub: LoadUserRepository
  hashComparerStub: HashComparer
  encrypterStub: Encrypter
}

export const makeSut = (): SutTypes => {
  const loadUserRepositoryStub = new LoadUserRepositoryStub()
  const hashComparerStub = new HashComparerStub()
  const encrypterStub = new EncrypterStub()
  const sut = new Authentication(
    loadUserRepositoryStub,
    hashComparerStub,
    encrypterStub
  )
  return {
    sut,
    loadUserRepositoryStub,
    hashComparerStub,
    encrypterStub
  }
}
