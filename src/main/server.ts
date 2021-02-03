import 'module-alias/register'
import { connect } from '../infra/db/helpers/mongoose'
import { port } from '../config/env'
import logger from '../config/logger'

connect()
  .then(async () => {
    logger.info('Mongodb connected successfully')

    const app = (await import('./config/index')).default

    app.listen(port, () => {
      logger.info(`Server running at http://localhost:${port}`)
    })
  })
  .catch(err => console.error(err))
