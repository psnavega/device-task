import express from 'express'
import appFactory from './infra'

const app = express()

void appFactory(app)

export default app