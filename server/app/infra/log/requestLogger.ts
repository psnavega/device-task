import { type Request, type Response, type NextFunction } from 'express'
import { LoggerService } from './logService'

export function requestLogger (req: Request, res: Response, next: NextFunction): void {
  const body = req.body
  const logMessage = `${req.method} ${req.originalUrl} - ${JSON.stringify(body)}`
  LoggerService.log(logMessage)
  next()
}
