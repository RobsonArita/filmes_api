// src/controllers/user_auth_controller.ts
import { NextFunction, Request, Response, Router } from 'express'
import { Controller } from '../../core/controller'
import PostgressAdapter from '../../adapters/postgres_adapter'
import { UserService } from '../../services/user_service'
import Rules from '../../core/rules'
import adminMiddleware from '../../middlewares/admin_middleware'

class UserAuthController extends Controller {
    rules = new Rules()

    handle(): Router {

        /** [GET] LIST PAGINATED USERS */
        this.router.get('/', adminMiddleware, async (request: Request, response: Response, next: NextFunction) => {
            const handleResponser = this.getHandleResponser(response)
            try {
                const pageNumber = parseInt(request.query.pageNumber as string, 10) || 1
                const pageSize = parseInt(request.query.pageSize as string, 10) || 10

                const userService = new UserService(new PostgressAdapter())
                const users = await userService.getPaginatedUsers(pageNumber, pageSize)

                const totalUsers = await userService.countUsers()
                const totalPages = Math.ceil(totalUsers / pageSize)

                const pagination = {
                    pageNumber,
                    pageSize,
                    totalPages,
                    lastPage: pageNumber >= totalPages,
                    firstPage: pageNumber <= 1
                }

                return handleResponser.sendCreated({ 
                    data: users,
                    pagination
                })
            } catch (err) {
                next(err)
            }
        })

        return this.router
    }
}

export default new UserAuthController().handle()
