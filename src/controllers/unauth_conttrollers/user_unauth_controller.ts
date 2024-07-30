import { NextFunction,  Request, Response,  Router } from "express";
import { Controller } from "../../core/controller";

class UserUnauthController extends Controller {
    handle (): Router {

        this.router.post('/', async (request: Request, response: Response, next: NextFunction) => {
            try  {
                
                response.status(200)
                return response.json({ success: true })
            } catch (err) {

            }
        })

        return this.router
    }
}

export default new  UserUnauthController().handle()