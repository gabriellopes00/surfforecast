import { BeachPosition } from '../../src/domain/models/beach'
import { Beach } from '../../src/infra/db/beaches/models/beach'
import stormGlassWeather from '../fixtures/stormglass-weather-response.json'
import apiForecastResponse from '../fixtures/api-forecast-response.json'

import nock from 'nock'

describe('Beach forecast functional tests', () => {
  beforeEach(async () => {
    await Beach.deleteMany({})
    const defaultBeach = {
      lat: -33.792726,
      lng: 151.289824,
      name: 'Manly',
      position: BeachPosition.E
    }
    const beach = new Beach(defaultBeach)
    await beach.save()
  })

  it('Should return a forecast with jest a few times', async () => {
    nock('https://api.stormglass.io:443', {
      encodedQueryParams: true,
      reqheaders: {
        Authorization: (): boolean => true
      }
    })
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get('/v2/weather/point')
      .query({
        lat: '-33.792726',
        lng: '151.289824',
        params: /(.*)/,
        source: 'noaa'
      })
      .reply(200, stormGlassWeather)

    const { body, status } = await global.testRequest.get('/forecast')
    expect(status).toBe(200)
    expect(body).toEqual(apiForecastResponse)
  })
  it('should return 500 if something goes wrong during the processing', async () => {
    nock('https://api.stormglass.io:443', {
      encodedQueryParams: true,
      reqheaders: {
        Authorization: (): boolean => true
      }
    })
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get('/v1/weather/point')
      .query({ lat: '-33.792726', lng: '151.289824' })
      .replyWithError('Something went wrong')

    const { status } = await global.testRequest.get(`/forecast`)

    expect(status).toBe(500)
  })
})
