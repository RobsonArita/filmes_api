import { Router, Request, Response } from 'express'
import Responser from '../core/responser'

const unauthRouter = Router()

unauthRouter.get('/', async (_: Request, response: Response) => {
    const handleResponser = new Responser(response)
    return handleResponser.sendOk({ message: 'Ok.' })
  })


export { unauthRouter }