import { StormGlassClient } from './storm-glass'
import stormGlassWeather from '../../tests/fixtures/stormglass-weather-response.json'
import stormGlassNormalizedData from '../../tests/fixtures/stormglass-normalized-response.json'
import * as HTTPUtils from '../utils/implementations/request'

jest.mock('../utils/implementations/request')

describe('StormGlass client', () => {
  // Will unite the Requests types and method with the jest types and methods (mocks)
  const mockedRequest = new HTTPUtils.Request() as jest.Mocked<HTTPUtils.Request>

  const MockedRequestClass = HTTPUtils.Request as jest.Mocked<
    typeof HTTPUtils.Request
  >

  //Default fake coordinates
  const lat = -33.792726
  const lng = 151.289824

  it('Should return the normalized forecast from the StormGlass service', async () => {
    mockedRequest.get.mockResolvedValue({
      data: stormGlassWeather
    } as HTTPUtils.Response)
    const stormGlass = new StormGlassClient(mockedRequest)
    const response = await stormGlass.fetchPoints(lat, lng)

    expect(response).toEqual(stormGlassNormalizedData)
  })

  it('Should exclude incomplete data points', async () => {
    const incompleteResponse = {
      hours: [
        { windDirection: { noaa: 300 }, time: '2021-01-22T19:02:46.636Z' }
      ]
    }

    mockedRequest.get.mockResolvedValueOnce({
      data: incompleteResponse
    } as HTTPUtils.Response)

    const stormGlass = new StormGlassClient(mockedRequest)
    const response = await stormGlass.fetchPoints(lat, lng)
    expect(response).toEqual([])
  })

  it('Should return a generic error from StormGlass service when the request fails before reaching the service', async () => {
    // Fake StormGlass error
    mockedRequest.get.mockRejectedValueOnce({ message: 'Network Error' })

    const stormGlass = new StormGlassClient(mockedRequest)
    await expect(stormGlass.fetchPoints(lat, lng)).rejects.toThrow(
      'Unexpected error when trying to communicate to StormGlass: Network Error'
    )
  })

  it('Should get an StormGlassResponseError when the StormGlass service respondes with the error', async () => {
    MockedRequestClass.isRequestError.mockReturnValueOnce(true)
    mockedRequest.get.mockRejectedValueOnce({
      response: {
        status: 429,
        data: { errors: ['Rate Limit reached'] }
      }
    })

    const stormGlass = new StormGlassClient(mockedRequest)
    const request = stormGlass.fetchPoints(lat, lng)
    await expect(request).rejects.toThrow(
      'Unexpected error returned from StormGlass service: Error: {"errors":["Rate Limit reached"]} Code: 429'
    )
  })
})
