import { Response, Router } from 'express'
import Responser from './responser'
import Rules from './rules'

export abstract class Controller {
    protected router = Router()

    abstract handle (): Router
    protected abstract rules: Rules


    getHandleResponser (response: Response) {
        return new Responser(response)
    }
}