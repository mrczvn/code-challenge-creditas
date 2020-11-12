import express, { Express } from 'express'
import setupMiddlewares from './config/middlewares'
import setupRoutes from './config/routes'

const app: Express = express()

setupMiddlewares(app)
setupRoutes(app)

export default app
