/* eslint-disable @typescript-eslint/no-extraneous-class */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import * as winston from 'winston'
import { configureWinston } from './config/config'
import { addColors } from 'winston/lib/winston/config'
import { getDateNowFormatedWithHour } from '../../utils/Date'

export class LoggerService {
  private static readonly logger: winston.Logger = winston.createLogger(configureWinston())

  private static formatMessage (level: string, message: string, stack?: string): string {
    const dateNow = getDateNowFormatedWithHour()
    let formattedMessage = `${level.toUpperCase()} ${dateNow} - ${message}`
    if (stack != null) {
      formattedMessage += `\n${stack}`
    }
    return formattedMessage
  }

  static log (message: string): void {
    const formattedMessage = this.formatMessage('info', message)
    LoggerService.logger.log(formattedMessage, addColors({ info: 'green' }))
  }

  static error (message: string, stack?: string): void {
    const formattedMessage = this.formatMessage('error', message, stack)
    LoggerService.logger.error(formattedMessage, addColors({ error: 'red' }))
  }

  static warn (message: string): void {
    const formattedMessage = this.formatMessage('warn', message)
    LoggerService.logger.warn(formattedMessage, addColors({ warn: 'yellow' }))
  }

  static debug (message: string): void {
    const formattedMessage = this.formatMessage('debug', message)
    LoggerService.logger.debug(formattedMessage, addColors({ debug: 'blue' }))
  }

  static verbose (message: string): void {
    const formattedMessage = this.formatMessage('verbose', message)
    LoggerService.logger.verbose(formattedMessage, winston.addColors({ verbose: 'cyan' }))
  }
}
