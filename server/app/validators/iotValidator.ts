import * as Joi from 'joi'

export const createIotSchema = Joi.object().keys({
  tag: Joi.string().valid('poweron', 'poweroff', 'timebased', 'errorCode'),
  imei: Joi.string().required(),
  value: Joi.number().required()
}).required()

export const updateIotSchema = Joi.object().keys({
  tag: Joi.string().valid('poweron', 'poweroff', 'timebased', 'errorCode'),
  imei: Joi.forbidden(),
  value: Joi.number(),
  errorCode: Joi.when('tag', {
    is: 'errorCode',
    then: Joi.string().required(),
    otherwise: Joi.forbidden()
  }),
}).required()

export const listIotsSchema = Joi.object().keys({
  status: Joi.string().valid('has-reports', 'has-no-reports', 'on-and-offs', 'errors').required()
}).required()
