import * as winston from 'winston'
import { configureWinston } from './config/config'

export class LoggerService {
  private readonly logger: winston.Logger

  constructor () {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    this.logger = winston.createLogger(configureWinston())
  }

  log (message: string): void {
    this.logger.log('info', message)
  }

  error (message: string, stack?: string): void {
    this.logger.error(message, { stack })
  }

  warn (message: string): void {
    this.logger.warn(message)
  }

  debug (message: string): void {
    this.logger.debug(message)
  }

  verbose (message: string): void {
    this.logger.verbose(message)
  }
}
