import { Router, Request, Response } from 'express'
import Responser from '../core/responser'
import package_auth_controller from '../controllers/auth_controllers/package_auth_controller'
import adminMiddleware from '../middlewares/admin_middleware'
import genre_auth_controller from '../controllers/auth_controllers/genre_auth_controller'
import movie_auth_controller from '../controllers/auth_controllers/movie_auth_controller'
import user_auth_controller from '../controllers/auth_controllers/user_auth_controller'

const authRouter = Router()

authRouter.get('/', async (_: Request, response: Response) => {
  const handleResponser = new Responser(response)
  return handleResponser.sendOk({ message: 'Ok.' })
})
authRouter.use('/packages', adminMiddleware, package_auth_controller)
authRouter.use('/genres', genre_auth_controller)
authRouter.use('/movies', movie_auth_controller)
authRouter.use('/users', user_auth_controller)

export { authRouter }