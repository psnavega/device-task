import { RequestError } from '../errors/RequestError'
import { type IIot } from '../domains/interfaces/iot'
import iotModel from '../models/iotModel'

export async function update ({ body }: { body: IIot }): Promise<IIot> {
  try {
    const { imei, value, tag, errorCode } = body

    const iot = await iotModel.findOne({ imei }).exec()

    if (iot == null) { throw new RequestError('Iot not found', 404) }

    iot.value = value
    iot.tag = tag
  
    iot.value = value;
    iot.tag = tag;

    if (errorCode !== null) {
      iot.errorCode = errorCode;
    } else {
      iot.errorCode = undefined;
    }


    await iot.save()

    return iot
  } catch (e: any) {
    throw new RequestError(e.message ?? 'Unknown error', e.statusCode ?? 500)
  }
}

export async function create ({ body }: { body: IIot }): Promise<IIot> {
  try {
    await iotModel.find({
      imei: body.imei
    }).exec().then((iot) => {
      if (iot.length > 0) {
        throw new RequestError('Iot already exists', 409)
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