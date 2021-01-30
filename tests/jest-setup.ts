import { connect, close } from '../src/infra/db/helpers/mongoose'
import { port } from '../src/config/env'
import supertest from 'supertest'

const test = (async function server() {
  await connect()
  const app = (await import('../src/main/config/index')).default
  global.testRequest = supertest(app)
  return app.listen(port)
})()

// beforeAll(async () => {})

afterAll(async () => {
  await close()
  ;(await test).close()
})
