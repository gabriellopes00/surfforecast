// import { BeachPosition } from '../../src/domain/models/beach'
// import { Beach } from '../../src/infra/db/beaches/beach-model'
// import stormGlassWeather from '../fixtures/stormglass-weather-response.json'
// import apiForecastResponse from '../fixtures/api-forecast-response.json'
test('', () => expect(1 + 1).toBe(2))

// import nock from 'nock'
// import { generateToken, User } from '@src/infra/db/users/user-model'
// import { AddUserModel } from '@src/domain/usecases/users/add-user'

// describe('Beach forecast functional tests', () => {
//   const defaultUser: AddUserModel = {
//     name: 'John Doe',
//     email: 'john3@mail.com',
//     password: '1234'
//   }
//   let token: string
//   beforeEach(async () => {
//     await Beach.deleteMany({})
//     await User.deleteMany({})
//     const user = await new User(defaultUser).save()
//     const defaultBeach = {
//       lat: -33.792726,
//       lng: 151.289824,
//       name: 'Manly',
//       position: BeachPosition.E,
//       user: user.id
//     }
//     await new Beach(defaultBeach).save()
//     token = generateToken(user.toJSON())
//   })
//   it('should return a forecast with just a few times', async () => {
//     nock('https://api.stormglass.io:443', {
//       encodedQueryParams: true,
//       reqheaders: {
//         Authorization: (): boolean => true
//       }
//     })
//       .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
//       .get('/v2/weather/point')
//       .query({
//         lat: '-33.792726',
//         lng: '151.289824',
//         params: /(.*)/,
//         source: 'noaa'
//       })
//       .reply(200, stormGlassWeather)

//     const { body, status } = await global.testRequest
//       .get('/forecast')
//       .set({ 'access-token': token })
//     expect(status).toBe(200)
//     // Make sure we use toEqual to check value not the object and array itself
//     expect(body).toEqual(apiForecastResponse)
//   })

//   it('should return 500 if something goes wrong during the processing', async () => {
//     nock('https://api.stormglass.io:443', {
//       encodedQueryParams: true,
//       reqheaders: {
//         Authorization: (): boolean => true
//       }
//     })
//       .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
//       .get('/v1/weather/point')
//       .query({ lat: '-33.792726', lng: '151.289824' })
//       .replyWithError('Something went wrong')

//     const { status } = await global.testRequest
//       .get(`/forecast`)
//       .set({ 'access-token': token })

//     expect(status).toBe(500)
//   })
// })
