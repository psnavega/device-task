import { Schema, model } from 'mongoose'
import { type IotType } from '../interfaces/iot'

const iotSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  code: {
    type: String,
    require: true
  },
  rate: {
    type: Number,
    require: true
  },
  fiat: {
    type: Boolean,
    require: true
  }
},
{
  timestamps: true
}
)

export default model<IotType>('Iot', iotSchema)
