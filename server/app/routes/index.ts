/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { updateIotController } from '../controllers/iotController'

const routes = Router()

routes.patch('/:imei', updateIotController)
routes.post('/', updateIotController)

export default routes
