import { Express, NextFunction, Request, Response } from 'express'
import { unauthRouter } from '../../routers/unauth_router'
import { json} from 'express'
import Http from 'http'
import colors from 'colors'
import { timeAsDayjs } from '../../utils/time'
import settings from '../settings'
import errorHandlerMiddleware from '../../middlewares/error_handler_middleware'
import { authRouter } from '../../routers/auth_router'
import authenticateMiddleware from '../../middlewares/authenticate_middleware'
import { CreateUsersProcedure } from '../../procedures/create_users_procedure'
import { CreateGenresProcedure } from '../../procedures/create_genres_procedure'
import { CronJob } from 'cron'
import { SyncGenresRoutines } from '../../routines/sync_genres_routine'

export const setupRoutes = (app: Express) => {
  setupMiddlewares(app)
  app.use('/', unauthRouter, errorHandlerMiddleware)
  app.use('/auth', authenticateMiddleware, authRouter, errorHandlerMiddleware)
}

export const setupMiddlewares = (app: Express): void => {
  app.use(json({ limit: '100mb' }))

  app.use(terminalConsole)


  app.use((req, res, next) => {
    res.type('json')
    next()
  })

}

const methodColors = (method: string): string | void => {
  switch (method) {
    case 'POST':
      return colors.blue(method)
    case 'GET':
      return colors.green(method)
    case 'PUT':
      return colors.yellow(method)
    case 'DELETE':
      return colors.red(method)
    case 'PATCH':
      return colors.yellow(method)
    default:
  }
}

const terminalConsole = (request: Request, _: Response, next: NextFunction) => {
  const method = methodColors(request.method.trim())
  if (!method) return next()

  const requester = colors.blue((request.ip as string).replace(/[^\d.]/g, ''))
  const path = colors.cyan(request.url)
  const timer = colors.white(timeAsDayjs().format('HH:mm') || '')

  console.info(`${timer} ${requester} ${method} ${path}`)

  //@ts-ignore
  if (Object.keys(request.body).length) console.info(request.body)


  return next()
}

export default terminalConsole

export const setupServer = (app: Http.Server): void => {
  console.log(colors.blue('SERVER: Is running on'), colors.yellow(`${settings.IP}:${settings.PORT}`))

  //@ts-ignore
  app.listen(settings.PORT, settings.IP)
}

export const setupProcedures = async (runProcedures: boolean) => {
  if (!runProcedures) return null

  console.info(colors.cyan('==== PROCEDURE: running... ===='))

  try {
    await new CreateUsersProcedure().exec()
    await new CreateGenresProcedure().exec()
  } catch (err) {
    console.warn(err)
  }

  console.info(colors.cyan('==== PROCEDURE: done. ===='))
}

export const setupRoutines = async (runRoutines: boolean) => {
  if (!runRoutines) return null

  console.info(colors.cyan('==== ROUTINES: running... ===='))
  new CronJob('0 */2 * * *', SyncGenresRoutines).start()
}


