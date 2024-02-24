export interface IIot {
  _id: string
    tag: string
    imei: string
    value: number
    errorCode?: string | null
    createdAt: Date
    updatedAt: Date
  }
  