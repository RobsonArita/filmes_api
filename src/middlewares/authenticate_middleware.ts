import { NextFunction, Request, Response } from 'express'
import { ForbiddenExcepption } from '../core/exceptions'
import jwt from 'jsonwebtoken'
import settings from '../core/settings'

type jwtPayload = {
    id: string
    name: string
    email: string
}

const authenticateMiddleware = async (request: Request, _: Response, next: NextFunction) => {
    const token = request.headers.authorization?.split(' ')[1]
    if (!token) return next(new ForbiddenExcepption())

    try {
        const decoded = jwt.verify(token, settings.JWT_SECRET) as jwtPayload
        request.user = { 
            id: Number(decoded.id),
            email: decoded.email,
            name: decoded.name 
        }
        next()
    } catch (err) {
        return next(new ForbiddenExcepption())
    }
}

export default authenticateMiddleware