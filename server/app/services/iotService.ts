import { type IIot } from '../domains/interfaces/iot'
import { update, create, listIotFiltered } from '../repositories/iotRepository'
import moment from 'moment'

export async function updateService ({ imei, body }: { imei: string, body: IIot }): Promise<IIot> {
  const tempData = {
    ...body,
    imei
  }

  const iot = await update({ body: tempData })

  return iot
}

export async function createService ({ body }: { body: IIot }): Promise<IIot> {
  const newIot = await create({ body })

  return newIot
}

export async function listIotsService({ filter }: { filter: any }): Promise<IIot[]> {
  const iots = await strategyListIots({ status: filter.status });

  return iots
}

async function strategyListIots({ status }: { status: string }): Promise<IIot[]> {
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

  const filters = strategy[status];

  const iots = await listIotFiltered({ filter: filters });

  return iots;
}
