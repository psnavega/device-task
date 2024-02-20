import { RequestError } from '../errors/RequestError'
import { type IotType } from '../interfaces/iot'
import eventModel from '../models/iotModel'

export async function update ({ body }: { body: IotType }): Promise<IotType> {
  try {
    const { imei, value, tag } = body

    const iot = await eventModel.findOne({ imei }).exec()

    if (iot == null) { throw new RequestError('Event not found', 404) }

    iot.value = value
    iot.tag = tag
    iot.updatedAt = new Date()

    await iot.save()

    return iot
  } catch (e: unknown) {
    throw new RequestError()
  }
}

export async function create ({ body }: { body: IotType }): Promise<IotType> {
  try {
    const iot = await eventModel.create({
      ...body
    })

    await iot.save()

    return iot
  } catch (e: unknown) {
    throw new RequestError()
  }
}
