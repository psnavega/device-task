import connectToMongoDb from './databases/mongo'
import connectToRedis from './databases/redis'
import appMiddlewares from './middlewares'
import type { Express } from 'express'

export default async function appFactory (app: Express): Promise<void> {
  appMiddlewares(app)
  await connectToMongoDb()
  await connectToRedis()
}
