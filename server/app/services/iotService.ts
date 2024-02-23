import { type IIot } from '../domains/interfaces/iot'
import { RequestError } from '../errors/RequestError'
import { update, create, listIotFiltered } from '../repositories/iotRepository'
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

export async function listIotsService({ slugStatus }: { slugStatus: string }): Promise<IIot[]> {
  const iots = await strategyListIots({ slugStatus });

  return iots
}

async function strategyListIots({ slugStatus }: { slugStatus: string }): Promise<IIot[]> {
  const strategy: { [key: string]: any } = {
    'has-reports': {
      $and: [
        { updatedAt: { $lte: moment().subtract(30, 'minutes').toDate() } },
        { errorCode: null }
      ]
    },
    'has-no-reports': {
      $and: [
        { updatedAt: { $gt: moment().subtract(30, 'minutes').toDate() } },
        { errorCode: null }
      ]
    },
    'on-and-offs': {
      $or: [
        {
          $and: [
            { tag: 'poweron' },
            { updatedAt: { $gt: moment().subtract(30, 'minutes').toDate() } }
          ]
        },
        { tag: 'poweroff' }
      ],
      errorCode: null
    },
    'errors': {
      errorCode: { $ne: null }
    }
  };

  const filters = strategy[slugStatus];

  if (!filters) throw new RequestError('Invalid slugStatus', 400);

  const iots = await listIotFiltered({ filter: filters });

  return iots;
}
