import cors from 'cors'
import routes from '../../routes'
import type { Express } from 'express'
import express from 'express'
import { requestLogger } from '../log/requestLogger'

export default function appMiddlewares (app: Express): void {
  app.use(cors())
  app.use(express.json())
  app.use(requestLogger)
  app.use(routes)
}
