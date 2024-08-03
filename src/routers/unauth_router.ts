import { Router, Request, Response } from 'express'
import user_unauth_controller from '../controllers/unauth_conttrollers/user_unauth_controller'
import Responser from '../core/responser'

const unauthRouter = Router()

unauthRouter.use('/users', user_unauth_controller)
unauthRouter.get('/', async (_: Request, response: Response) => {
    const handleResponser = new Responser(response)
    return handleResponser.sendOk({ message: 'Ok.' })
  })


export { unauthRouter }