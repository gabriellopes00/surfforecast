import { Hasher } from '../../../../implementation/interfaces/users/hasher'
import { LoadUserRepository } from '../../../../implementation/interfaces/users/load-user-repository'
import { UserModel } from '../../../../domain/models/user'
import { AddUserModel } from '../../../../domain/usecases/users/add-user'
import { AddUserRepository } from '../../../interfaces/users/add-user-repository'
import { DbAddUser } from '../db-add-user'

class AddUserRepositoryStub implements AddUserRepository {
  async add(userData: AddUserModel): Promise<UserModel> {
    return new Promise(resolve =>
      resolve({
        id: 'any_id',
        name: 'gabriel',
        email: 'gabriel@example.com',
        password: 'gabriel123'
      })
    )
  }
}

class LoadUserRepositoryStub implements LoadUserRepository {
  async loadByEmail(email: string): Promise<UserModel> {
    return new Promise(resolve => resolve(null))
  }
}

class HasherStub implements Hasher {
  async hash(value: string): Promise<string> {
    return new Promise((resolve, reject) => resolve('hashed_password'))
  }
}

export const makeSut = () => {
  const userData: AddUserModel = {
    name: 'gabriel',
    email: 'gabriel@example.com',
    password: 'gabriel123'
  }
  const addUserRepositoryStub = new AddUserRepositoryStub()
  const loadUserRepository = new LoadUserRepositoryStub()
  const hasherStub = new HasherStub()
  const sut = new DbAddUser(
    hasherStub,
    addUserRepositoryStub,
    loadUserRepository
  )
  return {
    sut,
    addUserRepositoryStub,
    userData,
    loadUserRepository,
    hasherStub
  }
}
