import * as winston from 'winston'

export const configureWinston = (): any => {
  return {
    levels: winston.config.npm.levels,
    level: 'verbose',
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.timestamp({
            format: 'YYYY-MM-DD hh:mm:ss.SSS A'
          }),
          winston.format.align(),
          winston.format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
        )
      })
    ]
  }
}
