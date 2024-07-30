import { Express } from 'express'
import { unauthRouter } from '../../routers/unauth_router'


export const setupRoutes = (app: Express) => {
    app.use(unauthRouter)
}

