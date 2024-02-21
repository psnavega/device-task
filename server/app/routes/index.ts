/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { updateIotController } from '../controllers/iotController'

const routes = Router()

routes.patch('/api/iot/:imei', updateIotController)
routes.post('/api/iot', updateIotController)

export default routes
