import { env } from '../config/env'
import { Server } from '@overnightjs/core'
import express, { Application } from 'express'
import * as db from './infra/db/helpers/mongoose'

import { ForecastController } from './controllers/forecast'
import { BeachController } from './controllers/beaches'

import { MongoBeachRepository } from './infra/db/beaches/add-beach-repository'
import { DbAddBeach } from './data/usecases/db-add-beach'

export class SetupServer extends Server {
  constructor(private readonly port = env.port) {
    super()
  }

  private expressSetup(): void {
    this.app.use(express.json())
  }

  private controllersSetup(): void {
    const forecastController = new ForecastController()

    const mongoBeachRepository = new MongoBeachRepository()
    const dbAddBeach = new DbAddBeach(mongoBeachRepository)
    const beachController = new BeachController(dbAddBeach)

    this.addControllers([forecastController, beachController])
  }

  private async databaseSetup(): Promise<void> {
    await db.connect()
  }

  public getApp(): Application {
    return this.app
  }

  public async stop(): Promise<void> {
    await db.close()
  }

  public async init(): Promise<void> {
    this.expressSetup()
    this.controllersSetup()
    await this.databaseSetup()
  }

  public start(): void {
    this.app.listen(this.port, () =>
      console.log(`Server running at http://localhost:${this.port}`)
    )
  }
}
