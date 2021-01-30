import { makeSut, fakeAuthentication, fakeUser } from './factory'

describe('Authentication usecases', () => {
  describe('repositoryLoader usecase', () => {
    it('Should call LoadUserRepository with correct email', async () => {
      const { sut, loadUserRepositoryStub } = makeSut()
      const loadByEmailSpy = jest.spyOn(loadUserRepositoryStub, 'loadByEmail')

      await sut.authenticate(fakeAuthentication)
      expect(loadByEmailSpy).toHaveBeenCalledWith(fakeAuthentication.email)
    })

    it('Should throw if LoadUserRepository throws', async () => {
      const { sut, loadUserRepositoryStub } = makeSut()
      jest
        .spyOn(loadUserRepositoryStub, 'loadByEmail')
        .mockReturnValueOnce(
          new Promise((resolve, reject) => reject(new Error()))
        )

      const promiseError = sut.authenticate(fakeAuthentication)
      await expect(promiseError).rejects.toThrow()
    })

    it('Should return null if LoadUserRepository returns null', async () => {
      const { sut, loadUserRepositoryStub } = makeSut()
      jest
        .spyOn(loadUserRepositoryStub, 'loadByEmail')
        .mockReturnValueOnce(null)

      const accessToken = await sut.authenticate(fakeAuthentication)
      expect(accessToken).toBeNull()
    })
  })

  describe('HashComparer usecase', () => {
    it('Should call HashComparer with correct values', async () => {
      const { sut, hashComparerStub } = makeSut()
      const compareSpy = jest.spyOn(hashComparerStub, 'compare')

      await sut.authenticate(fakeAuthentication)
      expect(compareSpy).toHaveBeenCalledWith(
        fakeAuthentication.password,
        fakeUser.password
      )
    })

    it('Should throw if HashComparer throws', async () => {
      const { sut, hashComparerStub } = makeSut()
      jest
        .spyOn(hashComparerStub, 'compare')
        .mockReturnValueOnce(
          new Promise((resolve, reject) => reject(new Error()))
        )

      const promiseError = sut.authenticate(fakeAuthentication)
      await expect(promiseError).rejects.toThrow()
    })

    it('Should return null if HashComparer returns false', async () => {
      const { sut, hashComparerStub } = makeSut()
      jest
        .spyOn(hashComparerStub, 'compare')
        .mockReturnValueOnce(new Promise((resolve, reject) => resolve(false)))

      const accessToken = await sut.authenticate(fakeAuthentication)
      expect(accessToken).toBeNull()
    })
  })

  describe('Encrypter usecase', () => {
    it('Should call Encrypter with correct id', async () => {
      const { sut, encrypterStub } = makeSut()
      const generateSpy = jest.spyOn(encrypterStub, 'encrypt')

      await sut.authenticate(fakeAuthentication)
      expect(generateSpy).toHaveBeenCalledWith(fakeUser.id)
    })

    it('Should throw if Encrypter throws', async () => {
      const { sut, encrypterStub } = makeSut()
      jest
        .spyOn(encrypterStub, 'encrypt')
        .mockReturnValueOnce(
          new Promise((resolve, reject) => reject(new Error()))
        )

      const promiseError = sut.authenticate(fakeAuthentication)
      await expect(promiseError).rejects.toThrow()
    })

    it('Should return a token on success', async () => {
      const { sut } = makeSut()
      const accessToken = await sut.authenticate(fakeAuthentication)
      expect(accessToken).toBe('any_token')
    })
  })
})
