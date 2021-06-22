import express, { Express } from 'express'
import routes from './routes'


class AppController {
  readonly app: Express;
  constructor () {
    this.app = express()

    this.middlewares()
    this.routes()
  }

  middlewares () {
    this.app.use(express.json)
  }

  routes () {
    this.app.use(routes)
  }
}

export const app = new AppController().app
