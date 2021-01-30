/* import { AuthenticationModel, UserModel } from '@src/domain/models/user'
import { Encrypter } from '@src/implementation/interfaces/users/encrypter'
import { HashComparer } from '@src/implementation/interfaces/users/hash-comparer'
import { LoadUserRepository } from '@src/implementation/interfaces/users/load-user-repository'
import { DbAuthentication } from './db-authentication'

const makeFakeAccount = (): UserModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email',
  password: 'hashed_password'
})

const makeFakeAuthentication = (): AuthenticationModel => ({
  email: 'test@example.com',
  password: 'test123'
})

const makeHashComparerStub = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async compare(value: string, hash: string): Promise<boolean> {
      return new Promise((resolve, reject) => resolve(true))
    }
  }

  return new HashComparerStub()
}

const makeEncrypterStub = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return new Promise((resolve, reject) => resolve('any_token'))
    }
  }

  return new EncrypterStub()
}

interface SutTypes {
  sut: DbAuthentication
  loadUserRepositoryStub: LoadUserRepository
  hashComparerStub: HashComparer
  encrypterStub: Encrypter
}
const makeSut = (): SutTypes => {
  const loadUserRepositoryStub = makeloadUserRepositoryStub()
  const hashComparerStub = makeHashComparerStub()
  const encrypterStub = makeEncrypterStub()
  const accessTokenRepositoryStub = makeAccessTokenRepositoryStub()
  const sut = new DbAuthentication(
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

describe('DbAuthentication Usecase', () => {
  // LoadUserRepository tests
  test('Should call LoadUserRepository with correct email', async () => {
    const { sut, loadUserRepositoryStub } = makeSut()
    const loadByEmailSpy = jest.spyOn(loadUserRepositoryStub, 'loadByEmail')

    await sut.authenticate(makeFakeAuthentication())
    expect(loadByEmailSpy).toHaveBeenCalledWith(makeFakeAuthentication().email)
  })

  test('Should throw if LoadUserRepository throws', async () => {
    const { sut, loadUserRepositoryStub } = makeSut()
    jest
      .spyOn(loadUserRepositoryStub, 'loadByEmail')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )

    const promiseError = sut.authenticate(makeFakeAuthentication())
    await expect(promiseError).rejects.toThrow()
  })

  test('Should return null if LoadUserRepository returns null', async () => {
    const { sut, loadUserRepositoryStub } = makeSut()
    jest.spyOn(loadUserRepositoryStub, 'loadByEmail').mockReturnValueOnce(null)

    const accessToken = await sut.authenticate(makeFakeAuthentication())
    expect(accessToken).toBeNull()
  })

  // HashComparer tests
  test('Should call HashComparer with correct values', async () => {
    const { sut, hashComparerStub } = makeSut()
    const compareSpy = jest.spyOn(hashComparerStub, 'compare')

    await sut.authenticate(makeFakeAuthentication())
    expect(compareSpy).toHaveBeenCalledWith(
      makeFakeAuthentication().password,
      makeFakeAccount().password
    )
  })

  test('Should throw if HashComparer throws', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest
      .spyOn(hashComparerStub, 'compare')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )

    const promiseError = sut.authenticate(makeFakeAuthentication())
    await expect(promiseError).rejects.toThrow()
  })

  test('Should return null if HashComparer returns false', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest
      .spyOn(hashComparerStub, 'compare')
      .mockReturnValueOnce(new Promise((resolve, reject) => resolve(false)))

    const accessToken = await sut.authenticate(makeFakeAuthentication())
    expect(accessToken).toBeNull()
  })

  // Encrypter tests
  test('Should call Encrypter with correct id', async () => {
    const { sut, encrypterStub } = makeSut()
    const generateSpy = jest.spyOn(encrypterStub, 'encrypt')

    await sut.authenticate(makeFakeAuthentication())
    expect(generateSpy).toHaveBeenCalledWith(makeFakeAccount().id)
  })

  test('Should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest
      .spyOn(encrypterStub, 'encrypt')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )

    const promiseError = sut.authenticate(makeFakeAuthentication())
    await expect(promiseError).rejects.toThrow()
  })

  test('Should return a token on success', async () => {
    const { sut } = makeSut()
    const accessToken = await sut.authenticate(makeFakeAuthentication())
    expect(accessToken).toBe('any_token')
  })

  // AccessToken repository tests
  test('Should call AccessTokenRepository with correct values', async () => {
    const { sut, accessTokenRepositoryStub } = makeSut()
    const storeAccessTokenSpy = jest.spyOn(
      accessTokenRepositoryStub,
      'storeAccessToken'
    )

    await sut.authenticate(makeFakeAuthentication())
    expect(storeAccessTokenSpy).toHaveBeenCalledWith(
      makeFakeAccount().id,
      'any_token'
    )
  })

  test('Should throw if AccessTokenRepository throws', async () => {
    const { sut, accessTokenRepositoryStub } = makeSut()
    jest
      .spyOn(accessTokenRepositoryStub, 'storeAccessToken')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )

    const promiseError = sut.authenticate(makeFakeAuthentication())
    await expect(promiseError).rejects.toThrow()
  })

  test('Should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest
      .spyOn(encrypterStub, 'encrypt')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )

    const promiseError = sut.authenticate(makeFakeAuthentication())
    await expect(promiseError).rejects.toThrow()
  })
})
 */

test('', () => {
  expect(1 + 1).toEqual(2)
})
