import 'dotenv/config'

export const port = process.env.PORT
export const stormGlassToken = process.env.STORM_GLASS_TOKEN
export const stormGlassUrl = 'https://api.stormglass.io/v2'
export const mongoUrl =
  process.env.MONGO_URL || 'mongodb://localhost:27017/surfing-app'

export const env = { port, stormGlassToken, stormGlassUrl, mongoUrl }
