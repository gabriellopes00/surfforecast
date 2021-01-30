import 'module-alias/register'
import { connect } from '../infra/db/helpers/mongoose'
import { mongoUrl, port } from '../config/env'

connect()
  .then(async () => {
    console.log(`Mongodb connected successfully`)

    const app = (await import('./config/index')).default

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`)
    })
  })
  .catch(err => console.error(err))
