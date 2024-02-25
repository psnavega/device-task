import { RequestError } from '../errors/RequestError'
import { type IIot } from '../domains/interfaces/iot'
import iotModel from '../models/iotModel'

export async function update ({ body }: { body: IIot }): Promise<IIot> {
  try {
    const { imei, value, tag, errorCode } = body

    const iotUpdated = await iotModel.findOneAndUpdate({ imei }, {
      value,
      tag,
      errorCode
    }).exec()

    if (!iotUpdated) {
      throw new RequestError('The Device with this IMEI were not found', 404)
    }

    return iotUpdated
  } catch (e: any) {
    throw new RequestError(e.message ?? 'Unknown error', e.statusCode ?? 500)
  }
}

export async function create ({ body }: { body: IIot }): Promise<IIot> {
  try {
    await iotModel.find({
      imei: body.imei
    }).exec()
    .then((iot) => {
      if (iot.length > 0) {
        throw new RequestError('The device with this IMEI already exists and should be unique', 409)
      }
    })

    const iot = await iotModel.create({
      ...body
    })

    await iot.save()

    return iot
  } catch (e: any) {
    throw new RequestError(e.message ?? 'Unknown error', e.statusCode ?? 500)
  }
}

export async function listIotFiltered({ filter }: { filter: any }): Promise<IIot[]> {
  try {
      const iots = await iotModel
          .find(filter)
          .exec();

      return iots;
  } catch (error: any) {
      throw new RequestError(error.message ?? 'Unknown error', error.statusCode ?? 500);
  }
}

export async function listAllErrorsUnique(): Promise<string[]> {
  try {
    const errors = await iotModel.find().distinct('errorCode').exec()

    const filteredErrors = errors.filter(error => typeof error === 'string') as string[];

    return filteredErrors;
  } catch (error: any) {
    throw new RequestError(error.message ?? 'Unknown error', error.statusCode ?? 500);
  }
}
