import { StormGlassClient } from './storm-glass'
import stormGlassWeather from '../../tests/fixtures/stormglass-weather-response.json'
import stormGlassNormalizedData from '../../tests/fixtures/stormglass-normalized-response.json'
import axios from 'axios'

jest.mock('axios')

describe('StormGlass client', () => {
  // Will unite the axios types and method with the jest types and methods (mocks)
  const mockedAxios = axios as jest.Mocked<typeof axios>

  //Default fake coordinates
  const lat = -33.792726
  const lng = 151.289824

  it('Should return the normalized forecast from the StormGlass service', async () => {
    mockedAxios.get.mockResolvedValue({ data: stormGlassWeather })
    const stormGlass = new StormGlassClient(mockedAxios)
    const response = await stormGlass.fetchPoints(lat, lng)

    expect(response).toEqual(stormGlassNormalizedData)
  })

  it('Should exclude incomplete data points', async () => {
    const incompleteResponse = {
      hours: [
        { windDirection: { noaa: 300 }, time: '2021-01-22T19:02:46.636Z' }
      ]
    }

    mockedAxios.get.mockResolvedValueOnce({ data: incompleteResponse })

    const stormGlass = new StormGlassClient(mockedAxios)
    const response = await stormGlass.fetchPoints(lat, lng)
    expect(response).toEqual([])
  })

  it('Should return a generic error from StormGlass service when the request fails before reaching the service', async () => {
    // Fake StormGlass error
    mockedAxios.get.mockRejectedValueOnce({ message: 'Network Error' })

    const stormGlass = new StormGlassClient(mockedAxios)
    await expect(stormGlass.fetchPoints(lat, lng)).rejects.toThrow(
      'Unexpected error when trying to communicate to StormGlass: Network Error'
    )
  })

  it('Should get an StormGlassResponseError when the StormGlass service respondes with the error', async () => {
    mockedAxios.get.mockRejectedValueOnce({
      response: {
        status: 429,
        data: { errors: ['Rate Limit reached'] }
      }
    })

    const stormGlass = new StormGlassClient(mockedAxios)
    const request = stormGlass.fetchPoints(lat, lng)
    await expect(request).rejects.toThrow(
      'Unexpected error returned by the StormGlass service: Error: {"errors":["Rate Limit reached"]} Code: 429'
    )
  })
})
