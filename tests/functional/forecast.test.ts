// import { Beach } from '@src/infra/db/beaches/beach-model'
// import { User } from '@src/infra/db/users/user-model'
// import { BeachPosition } from '@src/domain/models/beach'
// import stormGlassWeather from '../fixtures/stormglass-weather-response.json'
// import apiForecastResponse from '../fixtures/api-forecast-response.json'

// import nock from 'nock'

// describe('Beach forecast functional tests', () => {
//   const fakeUser = {
//     name: 'Gabriel Lopes',
//     email: 'gabriel@mail.com',
//     password: '1234',
//     passwordConfirmation: '1234'
//   }

//   beforeEach(async () => {
//     await Beach.deleteMany({})
//     await User.deleteMany({})

//     const defaultBeach = {
//       lat: -33.792726,
//       lng: 151.289824,
//       name: 'Manly',
//       position: BeachPosition.E,
//       user: '60158934c537fd21959c6f1c'
//     }
//     await new Beach(defaultBeach).save()
//   })

//   it('Should return a forecast with just a few times', async () => {
//     await global.testRequest.post('/api/users').send(fakeUser)
//     const responseToken = await global.testRequest
//       .post('/api/login')
//       .send({ email: fakeUser.email, password: fakeUser.password })
//     const token = responseToken.body.accessToken

//     nock('https://api.stormglass.io', {
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
//       .get('/api/forecast')
//       .set({ 'access-token': token })

//     expect(status).toBe(200)
//     expect(body).toEqual(apiForecastResponse)
//   })

//   // it('should return 500 if something goes wrong during the processing', async () => {
//   //   await global.testRequest.post('/api/users').send(fakeUser)
//   //   const responseToken = await global.testRequest
//   //     .post('/api/login')
//   //     .send({ email: fakeUser.email, password: fakeUser.password })
//   //   const token = responseToken.body.accessToken

//   //   nock('https://api.stormglass.io', {
//   //     encodedQueryParams: true,
//   //     reqheaders: {
//   //       Authorization: (): boolean => true
//   //     }
//   //   })
//   //     .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
//   //     .get('/v2/weather/point')
//   //     .query({ lat: '-33.792726', lng: '151.289824' })
//   //     .replyWithError('Something went wrong')

//   //   const { status } = await global.testRequest
//   //     .get('/api/forecast')
//   //     .set({ 'access-token': token })

//   //   expect(status).toBe(500)
//   // })
// })

test('test in development', () => {
  expect(1 + 1).toBe(2)
})
