import { StormGlassClient } from '../../client/storm-glass'
import { BeachModel, BeachPosition } from '../../../domain/models/beach'
import { ForecastService } from './forecast-service'
import { ForecastInternalProcessingError } from './errors/internal-processing-error'
import stormGlassNormalizedData from '../../../../tests/fixtures/stormglass-normalized-response.json'
import apiExpectedResponse from '../../../../tests/fixtures/api-forecast-response.json'

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

    const forecast = new ForecastService(mockedStormGlassClient)
    const beachesWithRating = await forecast.processByBeaches(beaches)
    expect(beachesWithRating).toEqual(apiExpectedResponse)
  })

  it('Should return an empty list when beaches array is empty', async () => {
    const forecastService = new ForecastService()
    const response = await forecastService.processByBeaches([])
    expect(response).toEqual(response)
  })

  it('Should throw internal processing error when something goes wrong during the rating process', async () => {
    mockedStormGlassClient.fetchPoints.mockRejectedValueOnce(
      'Error fetching data'
    )

    const forecast = new ForecastService(mockedStormGlassClient)
    await expect(forecast.processByBeaches(beaches)).rejects.toThrow(
      ForecastInternalProcessingError
    )
  })
})
