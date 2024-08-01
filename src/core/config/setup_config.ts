import { Express, NextFunction, Request, Response } from 'express'
import { unauthRouter } from '../../routers/unauth_router'
import { json, Router, urlencoded } from 'express'
import Http from 'http'
import colors from 'colors'
import { timeAsDayjs } from '../../utils/time'
import settings from '../settings'

export const setupRoutes = (app: Express) => {
  setupMiddlewares(app)
  app.use('/', unauthRouter)
}

export const setupMiddlewares = (app: Express): void => {
  app.use(json({ limit: '100mb' }))
  // app.use(urlencoded({ extended: false, limit: '100mb' }))

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


