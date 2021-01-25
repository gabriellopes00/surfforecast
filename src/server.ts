import { env } from '../config/env'
import { Server } from '@overnightjs/core'
import express, { Application } from 'express'
import * as db from './database/index'

import { ForecastController } from './controllers/forecast'
import { BeachController } from './controllers/beaches'

export class SetupServer extends Server {
  constructor(private readonly port = env.port) {
    super()
  }

  private expressSetup(): void {
    this.app.use(express.json())
  }

  private controllersSetup(): void {
    const forecastController = new ForecastController()
    const beachController = new BeachController()

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

  public async start(): Promise<void> {
    this.expressSetup()
    this.controllersSetup()
    await this.databaseSetup()
  }
}
