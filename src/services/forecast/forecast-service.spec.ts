import { StormGlassClient } from '../../client/storm-glass'
import stormGlassNormalizedData from '../../../tests/fixtures/stormglass-normalized-response.json'
import { BeachModel, BeachPosition } from '../../domain/models/beach'
import { ForecastService } from './forecast-service'
import { ForecastInternalProcessingError } from './errors/internal-processing-error'
import { AddBeachModel } from '@src/domain/usecases/add-beach'

jest.mock('../../client/storm-glass.ts')

describe('Forecast Service', () => {
  const mockedStormGlassClient = new StormGlassClient() as jest.Mocked<StormGlassClient>

  const beaches: BeachModel[] = [
    {
      lat: -33.792726,
      lng: 151.289824,
      name: 'Manly',
      position: BeachPosition.E,
      id: 'any_id'
    }
  ]

  it('Should return the forecast for a list of beaches', async () => {
    mockedStormGlassClient.fetchPoints.mockResolvedValueOnce(
      stormGlassNormalizedData
    )

    const expectedResponse = [
      {
        time: '2020-04-26T00:00:00+00:00',
        forecast: [
          {
            lat: -33.792726,
            lng: 151.289824,
            name: 'Manly',
            position: 'E',
            rating: 1,
            swellDirection: 64.26,
            swellHeight: 0.15,
            swellPeriod: 3.89,
            time: '2020-04-26T00:00:00+00:00',
            waveDirection: 231.38,
            waveHeight: 0.47,
            windDirection: 299.45,
            windSpeed: 100
          }
        ]
      },
      {
        time: '2020-04-26T01:00:00+00:00',
        forecast: [
          {
            lat: -33.792726,
            lng: 151.289824,
            name: 'Manly',
            position: 'E',
            rating: 1,
            swellDirection: 123.41,
            swellHeight: 0.21,
            swellPeriod: 3.67,
            time: '2020-04-26T01:00:00+00:00',
            waveDirection: 232.12,
            waveHeight: 0.46,
            windDirection: 310.48,
            windSpeed: 100
          }
        ]
      },
      {
        time: '2020-04-26T02:00:00+00:00',
        forecast: [
          {
            lat: -33.792726,
            lng: 151.289824,
            name: 'Manly',
            position: 'E',
            rating: 1,
            swellDirection: 182.56,
            swellHeight: 0.28,
            swellPeriod: 3.44,
            time: '2020-04-26T02:00:00+00:00',
            waveDirection: 232.86,
            waveHeight: 0.46,
            windDirection: 321.5,
            windSpeed: 100
          }
        ]
      }
    ]

    const forecast = new ForecastService(mockedStormGlassClient)
    const beachesWithRating = await forecast.processForecastForBeaches(beaches)
    expect(beachesWithRating).toEqual(expectedResponse)
  })

  it('Should return an empty list when beaches array is empty', async () => {
    const forecastService = new ForecastService()
    const response = await forecastService.processForecastForBeaches([])
    expect(response).toEqual(response)
  })

  it('Should throw internal processing error when something goes wrong during the rating process', async () => {
    mockedStormGlassClient.fetchPoints.mockRejectedValueOnce(
      'Error fetching data'
    )

    const forecast = new ForecastService(mockedStormGlassClient)
    await expect(forecast.processForecastForBeaches(beaches)).rejects.toThrow(
      ForecastInternalProcessingError
    )
  })
})
