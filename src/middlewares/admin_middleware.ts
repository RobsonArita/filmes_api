import { NextFunction, Request, Response } from 'express'
import { UnauthorizedException } from '../core/exceptions'
import UserModel from '../models/user_model'

const adminMiddleware = async (request: Request, _: Response, next: NextFunction) => {
    if (!request.userId) throw new UnauthorizedException()
    if (!request.userEmail) throw new UnauthorizedException()
    if (!request.userName) throw new UnauthorizedException()

    const adminUser = UserModel.adminUser 
    const isAdmin = Boolean(
        request.userEmail === adminUser.email &&
        request.userName === adminUser.name
    )
    if (!isAdmin) throw new UnauthorizedException()

    return next()
}

export default adminMiddleware