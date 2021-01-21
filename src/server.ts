import { env } from '../config/env'
import { Server } from '@overnightjs/core'
import express, { Application } from 'express'

import { ForecastController } from './controllers/forecast'

export class SetupServer extends Server {
  constructor(private readonly port = env.port) {
    super()
  }

  private expressSetup(): void {
    this.app.use(express.json())
  }

  private controllersSetup(): void {
    const forecastController = new ForecastController()
    this.addControllers([forecastController])
  }

  public getApp(): Application {
    return this.app
  }

  public start(): void {
    this.expressSetup()
    this.controllersSetup()
  }
}
