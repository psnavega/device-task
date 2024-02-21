import { Schema, model } from 'mongoose'
import { type IotType } from '../interfaces/iot'

const iotSchema = new Schema({
  tag: {
    type: String,
    require: true
  },
  imei: {
    type: String,
    require: true
  },
  rate: {
    type: Number,
    require: true
  }
},
{
  timestamps: true
}
)

export default model<IotType>('Iot', iotSchema)
