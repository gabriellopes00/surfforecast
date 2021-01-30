import { secretKey } from '../../config/env'
import { JwtAdapter } from '../../infra/cryptography/jwt-adapter'
import { ForecastController } from '../../presentation/controllers/forecast'

const decrypter = new JwtAdapter(secretKey)
export const forecastController = new ForecastController(decrypter)
