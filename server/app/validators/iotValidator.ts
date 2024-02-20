import Joi from 'joi'

export const createIotSchema = Joi.object({
  body: Joi.object({
    tag: Joi.string().required(),
    imei: Joi.string().required(),
    valor: Joi.number().required(),
    timestamp: Joi.date().iso().required()
  }).required()
})

export const updateIotSchema = Joi.object({
  body: Joi.object({
    tag: Joi.string(),
    valor: Joi.number()
  }).min(1)
})
