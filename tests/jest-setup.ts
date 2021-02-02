import { connect, close } from '../src/infra/db/helpers/mongoose'
import { port } from '../src/config/env'
import supertest from 'supertest'
import app from '../src/main/config/index'
import server from '@src/main/server'

beforeAll(async () => {
  await connect()
  const server = (await import('../src/main/server')).default
  global.testRequest = supertest(app)
})

afterAll(async () => {
  await close()
  server.close()
})
