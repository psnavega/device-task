/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { createIotController, listErrorsController, listIotsController, updateIotController } from '../controllers/iotController'

const routes = Router()

routes.patch('/api/v1/iot/:imei', updateIotController)
routes.post('/api/v1/iot', createIotController)
routes.get('/api/v1/iots', listIotsController)
routes.get('/api/v1/iot/errors', listErrorsController)

export default routes
