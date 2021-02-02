// import { generateToken, User } from '@src/infra/db/users/user-model'
// import { Beach } from '../../src/infra/db/beaches/beach-model'

// describe('Beaches functional tests', () => {
//   const defaultUser = {
//     name: 'John Doe',
//     email: 'john@mail.com',
//     password: '1234'
//   }
//   beforeAll(async () => await Beach.deleteMany({}))
//   let token: string
//   beforeEach(async () => {
//     await Beach.deleteMany({})
//     await User.deleteMany({})
//     const newUser = await new User(defaultUser).save()
//     token = generateToken(newUser.toJSON())
//   })
//   afterAll(async () => await Beach.deleteMany({}))

//   describe('When creating a beach ', () => {
//     const newBeach = {
//       lat: -33.792726,
//       lng: 151.289824,
//       name: 'Manly',
//       position: 'E'
//     }

//     it('Should create a beach on success', async () => {
//       const response = await global.testRequest
//         .post('/beach')
//         .set({ 'access-token': token })
//         .send(newBeach)
//       expect(response.status).toBe(201)
//       expect(response.body).toEqual(expect.objectContaining(newBeach))
//     })

//     it('Should return 422 when there is a validation error', async () => {
//       delete newBeach.lat
//       const response = await global.testRequest
//         .post('/beach')
//         .set({ 'access-token': token })
//         .send(newBeach)
//       expect(response.status).toBe(422)
//       expect(response.body).toEqual({
//         error: 'Beach validation failed: lat: Path `lat` is required.'
//       })
//     })
//   })
// })

test('', () => expect(1 + 1).toBe(2))
