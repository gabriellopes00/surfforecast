import { Beach } from '@src/infra/db/beaches/beach-model'
import { User } from '@src/infra/db/users/user-model'

describe('Beaches functional tests', () => {
  const fakeBeach = {
    lat: -33.792726,
    lng: 151.289824,
    name: 'Manly',
    position: 'E'
  }

  const fakeUser = {
    name: 'Gabriel Lopes',
    email: 'gabriel@mail.com',
    password: '1234',
    passwordConfirmation: '1234'
  }

  beforeAll(async () => await Beach.deleteMany({}))
  beforeEach(async () => {
    await Beach.deleteMany({})
    await User.deleteMany({})
  })
  afterAll(async () => await Beach.deleteMany({}))

  describe('When creating a beach ', () => {
    it('Should create a beach on success', async () => {
      await global.testRequest.post('/api/users').send(fakeUser)
      const responseToken = await global.testRequest
        .post('/api/login')
        .send({ email: fakeUser.email, password: fakeUser.password })

      const token = responseToken.body.accessToken
      const response = await global.testRequest
        .post('/api/beach')
        .set({ 'access-token': token })
        .send(fakeBeach)

      expect(response.status).toBe(201)
      expect(response.body).toEqual(expect.objectContaining(fakeBeach))
    })

    it('Should return 400 when there is a validation error', async () => {
      await global.testRequest.post('/api/users').send(fakeUser)
      const responseToken = await global.testRequest
        .post('/api/login')
        .send({ email: fakeUser.email, password: fakeUser.password })

      const token = responseToken.body.accessToken

      const invalidBeach = { ...fakeBeach, name: undefined }
      const response = await global.testRequest
        .post('/api/beach')
        .set({ 'access-token': token })
        .send(invalidBeach)
      expect(response.status).toBe(400)
      expect(response.body).toEqual({ error: 'Missing param: name' })
    })

    it('Should return 401 if no token is provided', async () => {
      const response = await global.testRequest
        .post('/api/beach')
        .send(fakeBeach)
      expect(response.status).toBe(401)
    })

    it('Should return 401 if invalid token is provided', async () => {
      const response = await global.testRequest
        .post('/api/beach')
        .set({ 'access-token': 'invalid_token' })
        .send(fakeBeach)
      expect(response.status).toBe(401)
    })
  })
})
