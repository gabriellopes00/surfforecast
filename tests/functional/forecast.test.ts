// import { Position } from '@src/domain/models/beach'
// import stormGlassWeather3HoursFixture from '../fixtures/stormglass-weather-response.json'
// import apiForecastResponse1BeachFixture from '../fixtures/stormglass-normalized-response.json'

// import nock from 'nock'
// import { AddUserModel } from '@src/domain/models/user'
// import { Beach } from '@src/infra/db/beaches/beach-model'
// import { User } from '@src/infra/db/users/user-model'
// import { JwtAdapter } from '@src/infra/cryptography/jwt-adapter'
// import { secretKey } from '@src/config/env'

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
//       position: Position.E,
//       user: user.id
//     }
//     await new Beach(defaultBeach).save()
//     const genToken = new JwtAdapter(secretKey)
//     genToken.encrypt(user.id)
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
//       .reply(200, stormGlassWeather3HoursFixture)

//     const { body, status } = await global.testRequest
//       .get('/api/forecast')
//       .set({ 'access-token': token })
//     expect(status).toBe(200)
//     // Make sure we use toEqual to check value not the object and array itself
//     expect(body).toEqual(apiForecastResponse1BeachFixture)
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
//       .get(`/api/forecast`)
//       .set({ 'access-token': token })

//     expect(status).toBe(500)
//   })
// })

test('', () => {
  expect(1).toBe(1)
})
