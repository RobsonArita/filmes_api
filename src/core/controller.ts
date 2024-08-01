import { Response, Router } from 'express'
import Responser from './responser'

export abstract class Controller {
    protected router = Router()

    abstract handle (): Router

    getHandleResponser (response: Response) {
        return new Responser(response)
    }
}