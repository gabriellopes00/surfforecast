import { UserModel } from '../../../domain/models/user'
import { AddUserModel } from '../../../domain/usecases/add-user'
import { AddUserRepository } from '../../interfaces/add-user-repository'
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

const makeSut = () => {
  const userData: AddUserModel = {
    name: 'gabriel',
    email: 'gabriel@example.com',
    password: 'gabriel123'
  }
  const addUserRepositoryStub = new AddUserRepositoryStub()
  const sut = new DbAddUser(addUserRepositoryStub)
  return { sut, addUserRepositoryStub, userData }
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
})
