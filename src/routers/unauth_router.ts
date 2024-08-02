import { Router, Request, Response } from 'express'
import user_unauth_controller from '../controllers/unauth_conttrollers/user_unauth_controller'
import Responser from '../core/responser'
import errorHandler from '../middlewares/error_handler_middleware'

const unauthRouter = Router()

unauthRouter.use('/users', user_unauth_controller, errorHandler)
unauthRouter.get('/', async (_: Request, response: Response) => {
    const handleResponser = new Responser(response)
    return handleResponser.sendOk({ message: 'Ok.' })
  })


export { unauthRouter }