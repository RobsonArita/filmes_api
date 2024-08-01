import { NextFunction, Request, Response, Router } from "express";
import { Controller } from "../../core/controller";
import UserModel from "../../models/user_model";
import { UserService } from "../../services/user_service";
import PostgressAdapter from "../../adapters/postgres_adapter";
import Rules from "../../core/rules";

class UserUnauthController extends Controller {
    rules = new Rules()
    handle(): Router {

        /** [POST] CREATE  USER */
        this.router.post('/', async (request: Request, response: Response, next: NextFunction) => {
            const handleResponser = this.getHandleResponser(response)
            try {
                this.rules.validate(
                    { email: request.body.email },
                    { name: request.body.name },
                    { password: request.body.password },
                )
                const user = new UserModel({
                    email: request.body.email,
                    name: request.body.name,
                    password: request.body.password
                })

                const userService = new UserService(new PostgressAdapter())

                const created = await userService.create(user)

                return handleResponser.sendOk({ created })
            } catch (err) {
                next(err)
            }
        })

        /** [POST] AUTHENTICATE USER */
        this.router.post('/signin', async (request: Request, response: Response, next: NextFunction) => {
            const handleResponser = this.getHandleResponser(response)
            try {
                const { email, password } = request.body
                this.rules.validate(
                    { email },
                    { password },
                )

                const userService = new UserService(new PostgressAdapter())

                const authenticated = await userService.autenticate(email, password)

                return handleResponser.sendOk({ authenticated })
            } catch (err) {
                next(err)
            }
        })


        /** [POST] GENERATE RESET PASSWORD TOKEN */
        this.router.post('/forgot-password', async (request: Request, response: Response, next: NextFunction) => {
            const handleResponser = this.getHandleResponser(response)
            try {
                const { email } = request.body
                this.rules.validate(
                    { email }
                )

                const userService = new UserService(new PostgressAdapter())

                const response = await userService.generatePasswordResetToken(email)

                return handleResponser.sendOk({ ...response, message: 'Password reset email sent.' })
            } catch (err) {
                next(err)
            }
        })

        /** [POST] RESET PASSWORD */
        this.router.post('/reset-password', async (request: Request, response: Response, next: NextFunction) => {
            const handleResponser = this.getHandleResponser(response)
            try {
                const { token, newPassword } = request.body
                this.rules.validate(
                    { newPassword }
                )

                const userService = new UserService(new PostgressAdapter())

                await userService.resetPassword(token, newPassword)

                return handleResponser.sendOk({ message: 'Password reseted.' })
            } catch (err) {
                next(err)
            }
        })

        return this.router
    }
}

export default new UserUnauthController().handle()