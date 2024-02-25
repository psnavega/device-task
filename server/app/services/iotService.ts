import { type IIot } from '../domains/interfaces/iot'
import { RequestError } from '../errors/RequestError'
import queryBuilder from '../handlers/queryBuilder/filterDeviceByTagAndImei'
import { update, create, listIotFiltered, listAllErrorsUnique } from '../repositories/iotRepository'
import moment from 'moment'

export async function updateService ({ imei, body }: { imei: string, body: IIot }): Promise<IIot> {
  const tempData = buildData({
    tag: body.tag,
    imei,
    value: body.value,
    errorCode: body.errorCode
  })

  const iot = await update({ body: tempData })

  return iot
}

function buildData({
  tag,
  imei,
  value,
  errorCode
}: {
  tag: string,
  imei: string,
  value: number,
  errorCode?: string | null
}) {
  if (errorCode) {
    return {
      tag,
      imei,
      value,
      errorCode
    }
  }
  return {
    tag,
    imei,
    value,
    errorCode: null
  }
}

export async function createService ({ body }: { body: IIot }): Promise<IIot> {
  const newIot = await create({ body })

  return newIot
}

export async function listIotsService({ slugStatus, imei }: { slugStatus: string, imei?: string }): Promise<IIot[]> {
  const iots = await strategyMountQuery({ slugStatus, imei });

  return iots
}

async function strategyMountQuery({ slugStatus, imei }: { slugStatus: string, imei?: string }): Promise<IIot[]> {
  const query = queryBuilder.filterDeviceByTagAndImei({ slugStatus, imei });

  if (!query) throw new RequestError('Invalid slug status', 400);

  const iots = await listIotFiltered({ filter: query });

  return iots;
}

export async function listErrorsService (): Promise<string[]> {
  const iots = await listAllErrorsUnique();

  return iots
}
