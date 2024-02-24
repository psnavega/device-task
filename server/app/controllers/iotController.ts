import { type Request, type Response } from 'express'
import { updateService, createService, listIotsService } from '../services/iotService'
import { createIotSchema, listIotsSchema, updateIotSchema } from '../validators/iotValidator'
import { RequestError } from '../errors/RequestError'
import { type ControllerResponse } from '../domains/interfaces/httpResponse'
import { LoggerService } from '../infra/log/logService'

export async function updateIotController (req: Request, res: Response): Promise<ControllerResponse> {
  try {
    const { imei } = req.params

    const { error, value } = updateIotSchema.validate(req.body)

    if (error != null) {
      throw new RequestError(String(error.message ?? error), 422)
    }

    await updateService({ imei, body: value })

    return res.status(200).send({
      message: 'IOT updated'
    })
  } catch (error: any) {
    const message = error.message ?? 'Internal server error'
    const status = error.statusCode ?? 500

    LoggerService.error(message as string, error.stack)
    return res.status(status).send({
      error: true,
      message
    })
  }
}

export async function createIotController (req: Request, res: Response): Promise<ControllerResponse> {
  try {
    const { error, value } = createIotSchema.validate(req.body)

    if (error != null) {
      throw new RequestError(String(error.message ?? error), 422)
    }

    const iotCreated = await createService({ body: value })

    return res.status(200).send({
      message: 'IOT created',
      data: iotCreated
    })
  } catch (error: any) {
    const message = (error as Error).message ?? 'Internal server error'
    const status = error.statusCode ?? 500

    LoggerService.error(message, error.stack)

    return res.status(status).send({
      error: true,
      message
    })
  }
}

export async function listIotsController (req: Request, res: Response): Promise<ControllerResponse> {
  try {
    const { error, value } = listIotsSchema.validate(req.query)

    if (error != null) {
      throw new RequestError(String(error.message ?? error), 422)
    }

    const iots = await listIotsService({ slugStatus: value.status, imei: value.imei })

    return res.status(200).send({
      message: 'success',
      data: iots
    })
  } catch (error: any) {
    const message = (error as Error).message ?? 'Internal server error'
    const status = error.statusCode ?? 500

    LoggerService.error(message, error.stack)

    return res.status(status).send({
      error: true,
      message
    })
  }
}
