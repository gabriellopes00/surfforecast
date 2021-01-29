import 'dotenv/config'

export const port = process.env.PORT
export const stormGlassToken = process.env.STORM_GLASS_TOKEN
export const stormGlassUrl = process.env.STORM_GLASS_API_URL
export const secretKey = process.env.SECRET_KEY
export const mongoUrl =
  process.env.MONGO_URL || 'mongodb://localhost:27017/surfforecast'

export const env = { port, stormGlassToken, stormGlassUrl, mongoUrl }
