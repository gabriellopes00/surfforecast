import { SetupServer } from './server'
import { port } from '../config/env'
;(async (): Promise<void> => {
  const server = new SetupServer(port)
  await server.init()
  server.start()
})()
