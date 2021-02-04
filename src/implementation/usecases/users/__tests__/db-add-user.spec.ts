import { makeSut } from './factory'

describe('DbAddUser tests', () => {
  it('Should call AddUserRepository with correct values', async () => {
    const { sut, addUserRepositoryStub, userData } = makeSut()
    const addSpy = jest.spyOn(addUserRepositoryStub, 'add')
    await sut.add(userData)
    expect(addSpy).toHaveBeenCalledWith({
      ...userData,
      password: 'hashed_password'
    })
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
  it('Should call LoadUserRepository with correct email', async () => {
    const { sut, loadUserRepository, userData } = makeSut()
    const loadByEmailSpy = jest.spyOn(loadUserRepository, 'loadByEmail')

    await sut.add(userData)
    expect(loadByEmailSpy).toHaveBeenCalledWith('gabriel@example.com')
  })

  it('Should return null if loadUserRepository not returns null', async () => {
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

  // Hasher
  it('Should call Hasher with correct password', async () => {
    const { sut, hasherStub } = makeSut()
    const hashSpy = jest.spyOn(hasherStub, 'hash')
    const userData = {
      name: 'gabriel',
      email: 'gabrielluislopes00@gmail.com',
      password: 'password1234'
    }
    await sut.add(userData)
    expect(hashSpy).toHaveBeenCalledWith('password1234')
  })

  it('Should throw if Hasher throws', async () => {
    const { sut, hasherStub } = makeSut()
    jest
      .spyOn(hasherStub, 'hash')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )
    const userData = {
      name: 'gabriel',
      email: 'gabrielluislopes00@gmail.com',
      password: 'password1234'
    }
    const userPromise = sut.add(userData)
    await expect(userPromise).rejects.toThrow()
  })

  it('Should call AddUserRepository with correct values', async () => {
    const { sut, addUserRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addUserRepositoryStub, 'add')
    await sut.add({
      name: 'gabriel',
      email: 'gabrielluislopes00@gmail.com',
      password: 'password1234'
    })
    expect(addSpy).toHaveBeenCalledWith({
      name: 'gabriel',
      email: 'gabrielluislopes00@gmail.com',
      password: 'hashed_password'
    })
  })
})
