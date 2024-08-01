import colors from 'colors'
import { NextFunction, Request, Response } from 'express'
import Responser from '../core/responser'

export interface IError {
    code: number
    data: any
}

export class CustomError {
    readonly code: IError['code']
    readonly data: IError['data']

    constructor(err: IError) {
        this.code = err.code
        this.data = err.data
    }
}

export class AlreadyRegisteredUserException extends CustomError {
    constructor() {
        super({ code: 400, data: { message: 'Já existe um usuário com o email informado.' } })
    }
}

export class RegisteredEmailNotFound extends CustomError {
    constructor() {
        super({ code: 400, data: { message: 'Ocorreu um erro.' } })
    }
}

export class AutenticatedEmailNotFound extends CustomError {
    constructor() {
        super({ code: 400, data: { message: 'Email ou senha inválida' } })
    }
}

export class UserNotFound extends CustomError {
    constructor() {
        super({ code: 404, data: { message: 'Usuário não encontrado.' } })
    }
}

const errorHandler = async (err: IError, request: Request, response: Response, _: NextFunction) => {
    console.log(colors.red(`[${request.method}] ${request.originalUrl}`), err)

    const handleResponser = new Responser(response)
    if (!err.code) return handleResponser.sendInternalServerError(err.data)

    switch (err.code) {
        case 400:
            return handleResponser.sendBadRequest(err.data)

        case 404:
            return handleResponser.sendNotFound(err.data)
    }

    return handleResponser.sendInternalServerError(err.data)
}

export default errorHandler