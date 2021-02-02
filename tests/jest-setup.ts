import { connect, close } from '../src/infra/db/helpers/mongoose'
import supertest from 'supertest'
import app from '../src/main/config/index'

beforeAll(async () => {
  await connect()
  global.testRequest = supertest(app)
})

afterAll(async () => {
  await close()
})
