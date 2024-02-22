import { type Response } from 'express'

export interface HttpResponse<T = any> {
  success: boolean
  message?: string
  data?: T
  error?: boolean
}

export type ControllerResponse<T = any> = Response<HttpResponse<T>>
