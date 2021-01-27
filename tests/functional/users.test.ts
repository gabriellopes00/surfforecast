import { User } from '@src/infra/db/users/user-model'

describe('Users functional tests', () => {
  describe('When creating a new user', () => {
    beforeEach(async () => await User.deleteMany({}))

    const newUser = {
      name: 'gabriel',
      email: 'gabriel@example.com',
      password: '1234'
    }

    it('Should create a new user on success', async () => {
      const response = await global.testRequest.post('/users').send(newUser)
      expect(response.status).toBe(201)
      expect(response.body).toEqual(expect.objectContaining(newUser))
    })
  })
})
