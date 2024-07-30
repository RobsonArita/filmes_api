import { Router } from 'express'
import user_unauth_controller from '../controllers/unauth_conttrollers/user_unauth_controller'

const unauthRouter = Router()

unauthRouter.use('/users', user_unauth_controller)

export { unauthRouter }