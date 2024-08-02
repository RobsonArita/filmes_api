import { NextFunction, Request, Response, Router } from 'express'
import { Controller } from '../../core/controller'
import PostgressAdapter from '../../adapters/postgres_adapter'
import Rules from '../../core/rules'
import PackageModel from '../../models/package_model'
import { PackageService } from '../../services/package_service'

class PackageAuthController extends Controller {
    rules = new Rules()
    handle(): Router {

        /** [POST] CREATE  PACKAGE */
        this.router.post('/', async (request: Request, response: Response, next: NextFunction) => {
            const handleResponser = this.getHandleResponser(response)
            try {
                this.rules.validate(
                    { name: request.body.name },
                    { enabledThemes: request.body.enabledThemes },
                    request.body.version ? { version: request.body.version } : {}
                )
                const pack = new PackageModel({
                    name: request.body.name,
                    enabledThemes: request.body.enabledThemes,
                    version: request.body.version,
                })

                const packageService = new PackageService(new PostgressAdapter())

                const created = await packageService.create(pack)

                return handleResponser.sendOk({ created })
            } catch (err) {
                next(err)
            }
        })

        return this.router
    }
}

export default new PackageAuthController().handle()