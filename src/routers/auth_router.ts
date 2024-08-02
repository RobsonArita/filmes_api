import { Router, Request, Response } from 'express'
import user_unauth_controller from '../controllers/unauth_conttrollers/user_unauth_controller'
import Responser from '../core/responser'
import errorHandler from '../middlewares/error_handler_middleware'
import package_auth_controller from '../controllers/auth_controllers/package_auth_controller'
import adminMiddleware from '../middlewares/admin_middleware'

const authenticated = Router()
const authRouter = Router()

authenticated.use('/package', adminMiddleware, package_auth_controller)
authenticated.get('/', async (_: Request, response: Response) => {
    const handleResponser = new Responser(response)
    return handleResponser.sendOk({ message: 'Ok.' })
  })

authRouter.use('/auth', authenticated, errorHandler)
export { authRouter }