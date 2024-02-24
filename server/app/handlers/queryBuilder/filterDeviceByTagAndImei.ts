import moment from "moment";

function filterDeviceByTagAndImei({ slugStatus, imei }: { slugStatus: string, imei?: string }) {
    const strategy: { [key: string]: any } = {
        'has-reports': {
          $and: [
            { updatedAt: { $gte: moment().subtract(30, 'minutes').toDate() } },
            { errorCode: null }
          ]
        },
        'has-no-reports': {
          $and: [
            { updatedAt: { $lte: moment().subtract(30, 'minutes').toDate() } },
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
    
      const query = strategy[slugStatus];

      if (imei) {
        query.imei = { $regex: imei, $options: 'i' }
      }

      return query;
}

export default {
    filterDeviceByTagAndImei
}