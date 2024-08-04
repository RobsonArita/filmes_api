import { NextFunction, Request, Response, Router } from 'express'
import { Controller } from '../../core/controller'
import PostgressAdapter from '../../adapters/postgres_adapter'
import Rules from '../../core/rules'
import PackageModel from '../../models/package_model'
import { PackageService } from '../../services/package_service'
import { GenreService } from '../../services/genre_service'
import { MongoAdapter } from '../../adapters/mongo_adapter'

class PackageAuthController extends Controller {
    rules = new Rules()

    handle(): Router {

        /** [POST] CREATE PACKAGE */
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

                const mongoAdapter = new MongoAdapter()
                await mongoAdapter.connect()

                const genreService = new GenreService(mongoAdapter)
                await genreService.validate(request.body.enabledThemes)

                await mongoAdapter.disconnect()

                const packageService = new PackageService(new PostgressAdapter())
                const created = await packageService.create(pack)

                return handleResponser.sendCreated({ created })
            } catch (err) {
                next(err)
            }
        })

        /** [PATCH] UPDATE PACKAGE */
        this.router.patch('/:id', async (request: Request, response: Response, next: NextFunction) => {
            const handleResponser = this.getHandleResponser(response)
            try {
                const packId = parseInt(request.params.id, 10)
                this.rules.validate(
                    { id: packId },
                    { name: request.body.name },
                    { enabledThemes: request.body.enabledThemes },
                    request.body.version ? { version: request.body.version } : {}
                )
                const updateData = {
                    name: request.body.name,
                    enabledThemes: request.body.enabledThemes,
                    version: request.body.version,
                }

                const packageService = new PackageService(new PostgressAdapter())
                const updated = await packageService.update(packId, updateData)

                return handleResponser.sendOk({ updated })
            } catch (err) {
                next(err)
            }
        })

        /** [POST] ADD USER TO PACKAGE */
        this.router.post('/add-user', async (request: Request, response: Response, next: NextFunction) => {
            const handleResponser = this.getHandleResponser(response)
            try {
                const { userId, packageId } = request.body

                this.rules.validate({ userId }, { packageId })

                const packageService = new PackageService(new PostgressAdapter())
                const result = await packageService.addUserPackage(userId, packageId)

                return handleResponser.sendOk({ result })
            } catch (err) {
                next(err)
            }
        })

        /** [POST] REMOVE USER FROM PACKAGE */
        this.router.post('/remove-user', async (request: Request, response: Response, next: NextFunction) => {
            const handleResponser = this.getHandleResponser(response)
            try {
                const { userId, packageId } = request.body

                this.rules.validate({ userId }, { packageId })
                const packageService = new PackageService(new PostgressAdapter())
                const result = await packageService.removeUserPackage(userId, packageId)

                return handleResponser.sendOk({ result })
            } catch (err) {
                next(err)
            }
        })

        /** [GET] LIST PAGINATED PACKAGES */
        this.router.get('/', async (request: Request, response: Response, next: NextFunction) => {
            const handleResponser = this.getHandleResponser(response)
            try {
                const pageNumber = parseInt(request.query.pageNumber as string, 10) || 1
                const pageSize = parseInt(request.query.pageSize as string, 10) || 10
                
                const packageService = new PackageService(new PostgressAdapter())
                const packages = await packageService.getPaginatedPackages(pageNumber, pageSize)

                const totalPackages = await packageService.countPackages()
                const totalPages = Math.ceil(totalPackages / pageSize)

                const pagination = {
                    pageNumber,
                    pageSize,
                    totalPages,
                    lastPage: pageNumber >= totalPages,
                    firstPage: pageNumber <= 1
                }

                return handleResponser.sendOk({ 
                    data: packages,
                    pagination
                })
            } catch (err) {
                next(err)
            }
        })

        return this.router
    }
}

export default new PackageAuthController().handle()
