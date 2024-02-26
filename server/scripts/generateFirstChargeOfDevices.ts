import { IIot } from '../app/domains/interfaces/iot'
import iotModel from '../app/models/iotModel'

export async function generateFirstChargeOfDevices() {
    const devices: IIot[] = [
        {
            tag: 'device1',
            imei: '1A2B3C4D5E6F7G8H9I',
            value: 0,
            errorCode: null
        },
        {
            tag: 'device2',
            imei: '1A2B3C4D5E6F7G8H9J',
            value: 0,
            errorCode: null
        },
        {
            tag: 'device3',
            imei: '1A2B3C4D5E6F7G8H9K',
            value: 0,
            errorCode: null
        },
        {
            tag: 'device4',
            imei: '1A2B3C4D5E6F7G8H9L',
            value: 0,
            errorCode: null
        },
        {
            tag: 'device5',
            imei: '1A2B3C4D5E6F7G8H9M',
            value: 0,
            errorCode: null
        },
        {
            tag: 'device6',
            imei: '1A2B3C4D5E6F7G8H9N',
            value: 0,
            errorCode: null
        },
        {
            tag: 'device7',
            imei: '1A2B3C4D5E6F7G8H9O',
            value: 0,
            errorCode: null
        },
        {
            tag: 'device8',
            imei: '1A2B3C4D5E6F7G8H9P',
            value: 0,
            errorCode: null
        },
        {
            tag: 'device9',
            imei: '1A2B3C4D5E6F7G8H9Q',
            value: 0,
            errorCode: null
        },
        {
            tag: 'device10',
            imei: '1A2B3C4D5E6F7G8H9R',
            value: 0,
            errorCode: null
        
        }
    ]

    if (await iotModel.countDocuments() > 0) return
    
    devices.forEach(async device => {
        const deviceModel = new iotModel(device)
        await deviceModel.save()
    })
}