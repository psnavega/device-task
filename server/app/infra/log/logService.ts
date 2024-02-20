/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import * as winston from 'winston'
import { configureWinston } from './config/config'
import { addColors } from 'winston/lib/winston/config'

export class LoggerService {
  private readonly logger: winston.Logger

  constructor () {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    this.logger = winston.createLogger(configureWinston())
  }

  log (message: string): void {
    this.logger.log('info', message, addColors({ info: 'green' }))
  }

  error (message: string, stack?: string): void {
    this.logger.error(message, { stack }, addColors({ error: 'red' }))
  }

  warn (message: string): void {
    this.logger.warn(message, addColors({ warn: 'yellow' }))
  }

  debug (message: string): void {
    this.logger.debug(message, addColors({ debug: 'blue' }))
  }

  verbose (message: string): void {
    this.logger.verbose(message, winston.addColors({ verbose: 'cyan' }))
  }
}
