import { AddUserModel } from '@src/domain/models/user'
import { User } from '@src/infra/db/users/user-model'
import { MissingParamError } from '@src/presentation/errors/missing-param-error'
import { badRequest } from '@src/presentation/helpers/http/http'

describe('Users functional tests', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })

  describe('When creating a new user', () => {
    const fakeUser: AddUserModel = {
      name: 'Gabriel Lopes',
      email: 'gabriel@mail.com',
      password: '1234',
      passwordConfirmation: '1234'
    }

    it('Should return new user data on success', async () => {
      const response = await global.testRequest
        .post('/api/users')
        .send(fakeUser)

      expect(response.status).toBe(201)
    })

    it('Should return MissingParmError if received data is not complete', async () => {
      delete fakeUser.passwordConfirmation
      const response = await global.testRequest
        .post('/api/users')
        .send(fakeUser)

      expect(response.status).toBe(400)
      expect(response.body).toEqual({
        error: new MissingParamError('passwordConfirmation')
      })
    })

    test('', () => {
      expect(1 + 1).toBe(2)
    })
    // it('should successfully create a new user', async () => {
    //   const newUser = {
    //     name: 'John Doe',
    //     email: 'john@mail.com',
    //     password: '1234'
    //   }
    //   const response = await global.testRequest.post('/users').send(newUser)
    //   expect(response.status).toBe(201)
    //   await expect(
    //     compare(newUser.password, response.body.password)
    //   ).resolves.toBeTruthy()
    //   expect(response.body).toEqual(
    //     expect.objectContaining({
    //       ...newUser,
    //       ...{ password: expect.any(String) }
    //     })
    //   )
    // })

    // it('Should return 422 when there is a validation error', async () => {
    //   const newUser = {
    //     email: 'john@mail.com',
    //     password: '1234'
    //   }
    //   const response = await global.testRequest.post('/users').send(newUser)

    //   expect(response.status).toBe(422)
    //   expect(response.body).toEqual({
    //     code: 422,
    //     error: 'User validation failed: name: Path `name` is required.'
    //   })
    // })

    // it('Should return 409 when the email already exists', async () => {
    //   const newUser = {
    //     name: 'John Doe',
    //     email: 'john@mail.com',
    //     password: '1234'
    //   }
    //   await global.testRequest.post('/users').send(newUser)
    //   const response = await global.testRequest.post('/users').send(newUser)

    //   expect(response.status).toBe(409)
    //   expect(response.body).toEqual({
    //     code: 409,
    //     error: 'User validation failed: email: already exists in the database.'
    //   })
    // })
  })

  // describe('When authenticating a user', () => {
  //   it('should generate a token for a valid user', async () => {
  //     const newUser = {
  //       name: 'John Doe',
  //       email: 'john@mail.com',
  //       password: '1234'
  //     }
  //     await new User(newUser).save()
  //     const response = await global.testRequest
  //       .post('/users/auth')
  //       .send({ email: newUser.email, password: newUser.password })

  //     expect(response.body).toEqual(
  //       expect.objectContaining({ token: expect.any(String) })
  //     )
  //   })
  //   it('Should return UNAUTHORIZED if the user with the given email is not found', async () => {
  //     const response = await global.testRequest
  //       .post('/users/auth')
  //       .send({ email: 'some-email@mail.com', password: '1234' })

  //     expect(response.status).toBe(401)
  //   })
  // })
})
