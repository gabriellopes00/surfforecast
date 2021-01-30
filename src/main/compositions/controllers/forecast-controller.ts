import { secretKey } from '@src/config/env'
import { JwtAdapter } from '@src/infra/cryptography/jwt-adapter'
import { ForecastController } from '@src/presentation/controllers/forecast'

const decrypter = new JwtAdapter(secretKey)
export const forecastController = new ForecastController(decrypter)
