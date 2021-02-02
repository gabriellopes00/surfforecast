import { User } from '@src/infra/db/users/user-model'

describe('Users functional tests', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })

  const fakeUser = {
    name: 'Gabriel Lopes',
    email: 'gabriel@mail.com',
    password: '1234',
    passwordConfirmation: '1234'
  }

  describe('When creating a new user', () => {
    it('Should return new user data on success', async () => {
      const response = await global.testRequest
        .post('/api/users')
        .send(fakeUser)

      expect(response.status).toBe(201)
    })

    it('Should return MissingParmError if received data is not complete', async () => {
      const invalidUser = { ...fakeUser, passwordConfirmation: undefined }
      const response = await global.testRequest
        .post('/api/users')
        .send(invalidUser)

      expect(response.status).toBe(400)
      expect(response.body).toEqual({
        error: 'Missing param: passwordConfirmation'
      })
    })

    it('Should return 400 when an invalid email is provided', async () => {
      const invalidUser = { ...fakeUser, email: 'invalid_mail' }
      const response = await global.testRequest
        .post('/api/users')
        .send(invalidUser)

      expect(response.status).toBe(400)
      expect(response.body).toEqual({
        error: 'Invalid param: email'
      })
    })

    it('Should return 409 when received email already exists', async () => {
      await global.testRequest.post('/api/users').send(fakeUser)
      const response = await global.testRequest
        .post('/api/users')
        .send(fakeUser)

      expect(response.status).toBe(409)
      expect(response.body).toEqual({
        error: 'Received email is already in use'
      })
    })
  })

  describe('When authenticating a user', () => {
    it('Should generate a token for a valid user', async () => {
      await global.testRequest.post('/api/users').send(fakeUser)
      const response = await global.testRequest
        .post('/api/login')
        .send({ email: fakeUser.email, password: fakeUser.password })

      expect(response.body).toEqual(
        expect.objectContaining({ accessToken: expect.any(String) })
      )
    })

    it('Should return unauthorized if the user with the given email is not found', async () => {
      const response = await global.testRequest
        .post('/api/login')
        .send({ email: 'nonexistent@mail.com', password: '1234' })

      expect(response.status).toBe(401)
    })
  })
})
