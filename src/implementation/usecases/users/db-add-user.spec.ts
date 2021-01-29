import { LoadUserRepository } from '@src/implementation/interfaces/users/load-user-repository'
import { UserModel } from '../../../domain/models/user'
import { AddUserModel } from '../../../domain/usecases/users/add-user'
import { AddUserRepository } from '../../interfaces/users/add-user-repository'
import { DbAddUser } from './db-add-user'

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

const makeSut = () => {
  const userData: AddUserModel = {
    name: 'gabriel',
    email: 'gabriel@example.com',
    password: 'gabriel123'
  }
  const addUserRepositoryStub = new AddUserRepositoryStub()
  const loadUserRepository = new LoadUserRepositoryStub()
  const sut = new DbAddUser(addUserRepositoryStub, loadUserRepository)
  return { sut, addUserRepositoryStub, userData, loadUserRepository }
}

describe('DbAddUser tests', () => {
  it('Should call AddUserRepository with correct values', async () => {
    const { sut, addUserRepositoryStub, userData } = makeSut()
    const addSpy = jest.spyOn(addUserRepositoryStub, 'add')
    await sut.add(userData)
    expect(addSpy).toHaveBeenCalledWith(userData)
  })

  it('Should return a user on success', async () => {
    const { sut, userData } = makeSut()
    const user = await sut.add(userData)
    expect(user).toEqual({ id: 'any_id', ...userData })
  })

  it('Should throw if addUserRepository throws', async () => {
    const { sut, addUserRepositoryStub, userData } = makeSut()
    jest.spyOn(addUserRepositoryStub, 'add').mockReturnValueOnce(
      new Promise((resolve, reject) => {
        reject(new Error())
      })
    )

    const user = sut.add(userData)
    await expect(user).rejects.toThrow()
  })

  // LoadUserRepository tests
  test('Should call LoadUserRepository with correct email', async () => {
    const { sut, loadUserRepository, userData } = makeSut()
    const loadByEmailSpy = jest.spyOn(loadUserRepository, 'loadByEmail')

    await sut.add(userData)
    expect(loadByEmailSpy).toHaveBeenCalledWith('gabriel@example.com')
  })

  test('Should null if loadUserRepository not returns null', async () => {
    const { sut, loadUserRepository, userData } = makeSut()
    jest.spyOn(loadUserRepository, 'loadByEmail').mockReturnValueOnce(
      new Promise(resolve =>
        resolve({
          id: 'any_id',
          name: 'gabriel',
          email: 'gabriel@example.com',
          password: 'gabriel123'
        })
      )
    )
    const user = await sut.add(userData)
    expect(user).toBeNull()
  })
})
