import { NextFunction, Request, Response } from 'express'
import { ForbiddenExcepption } from '../core/exceptions'
import UserModel from '../models/user_model'

const adminMiddleware = async (request: Request, _: Response, next: NextFunction) => {
    if (!request.user) next(new ForbiddenExcepption())

    const adminUser = UserModel.adminUser 
    const isAdmin = Boolean(
        request.user?.email === adminUser.email &&
        request.user?.name === adminUser.name
    )
    if (!isAdmin) next(new ForbiddenExcepption())

    return next()
}

export default adminMiddleware