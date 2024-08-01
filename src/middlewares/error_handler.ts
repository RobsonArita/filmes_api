import colors from 'colors'
import { NextFunction, Request, Response } from 'express'
import Responser from '../core/responser'

export interface IError {
    code: number
    data: any
}

const errorHandler = async (err: IError, request: Request, response: Response, _: NextFunction) => {
    console.log(colors.red(`[${request.method}] ${request.originalUrl}`), err)

    const handleResponser = new Responser(response)
    if (!err.code) return handleResponser.sendInternalServerError(err.data)
}

export default errorHandler