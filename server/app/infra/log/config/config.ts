import * as winston from 'winston'

export const configureWinston = (): any => {
  return {
    levels: winston.config.npm.levels,
    level: 'verbose',
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp()
        )
      })
    ]
  }
}
