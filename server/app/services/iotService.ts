import { type IotType } from '../interfaces/iot'
import { update, create } from '../repositories/iotRepository'

export async function updateService ({ imei, body }: { imei: string, body: IotType }): Promise<IotType> {
  const tempData = {
    ...body,
    imei
  }

  const iot = await update({ body: tempData })

  return iot
}

export async function createService ({ body }: { body: IotType }): Promise<IotType> {
  const newIot = await create({ body })

  return newIot
}
