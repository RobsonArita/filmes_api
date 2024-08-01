import { NextFunction,  Request, Response,  Router } from "express";
import { Controller } from "../../core/controller";

class UserUnauthController extends Controller {
    handle (): Router {

        this.router.post('/', async (request: Request, response: Response, next: NextFunction) => {
            const handleResponser = this.getHandleResponser(response) 

            try  {

                return handleResponser.sendOk({ data: 1 })
            } catch (err) {

            }
        })

        return this.router
    }
}

export default new  UserUnauthController().handle()