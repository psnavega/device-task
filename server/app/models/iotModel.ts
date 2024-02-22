import { Schema, model } from 'mongoose'
import { type IIot } from '../domains/interfaces/iot'

const iotSchema = new Schema({
  tag: {
    type: String,
    require: true
  },
  imei: {
    type: String,
    require: true
  },
  value: {
    type: Number,
    require: true
  },
  errorCode: {
    type: String,
    require: false
  },
  errorDetail: {
    type: String,
    require: false
  }
},
{
  timestamps: true
}
)

export default model<IIot>('Iot', iotSchema)
