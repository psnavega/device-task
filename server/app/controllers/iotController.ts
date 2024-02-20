import { type Request, type Response } from 'express'
import { updateService, createService } from '../services/iotService'
import { createIotSchema } from '../validators/iotValidator'
import { RequestError } from '../errors/RequestError'

export async function updateIotController (req: Request, res: Response): Promise<void> {
  try {
    const { imei } = req.params

    const { error, value } = createIotSchema.validate(req.body)

    if (error != null) {
      throw new RequestError(error.message, 422)
    }

    await updateService({ imei, body: value })

    res.status(200).send({
      message: 'IOT updated'
    })
  } catch (error) {
    const message = (error as Error).message ?? 'Internal server error'
    const status = ((error as Error).message.length > 0) ? 400 : 500
    res.status(status).send(message)
  }
}

export async function createIotController (req: Request, res: Response): Promise<void> {
  try {
    const { error, value } = createIotSchema.validate(req.body)

    if (error != null) {
      throw new RequestError(error.message, 422)
    }

    await createService({ body: value })

    res.status(200).send({
      message: 'IOT created'
    })
  } catch (error) {
    const message = (error as Error).message ?? 'Internal server error'
    const status = ((error as Error).message.length > 0) ? 400 : 500
    res.status(status).send(message)
  }
}
