import 'module-alias/register'
import { connect } from '../infra/db/helpers/mongoose'
import { port } from '../config/env'
import logger from '../config/logger'

connect()
  .then(async () => {
    try {
      logger.info('Mongodb connected successfully')

      const app = (await import('./config/index')).default
      const server = app.listen(port, () => {
        logger.info(`Server running at http://localhost:${port}`)
      })

      const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT']
      exitSignals.map(sig =>
        process.on(sig, async () => {
          try {
            server.close()
            logger.info('Server stopped successfully')
            process.exit(0)
          } catch (error) {
            logger.error(`App exited with error: ${error}`)
            process.exit(1)
          }
        })
      )
    } catch (error) {
      logger.error(error)
      process.exit(1)
    }
  })
  .catch(error => {
    logger.error(error)
    process.exit(1)
  })

// Errors handles
process.on('unhandledRejection', (reason, promise) => {
  logger.error(
    `App exiting due an unhandled promise: ${promise} and reason: ${reason}`
  )
  throw reason
})

process.on('uncaughtException', error => {
  logger.error(`App exiting due to an uncaught exception: ${error}`)
  process.exit(0)
})
