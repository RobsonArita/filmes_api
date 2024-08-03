import { NextFunction, Request, Response, Router } from 'express'
import { Controller } from '../../core/controller'
import Rules from '../../core/rules'
import { GenreService } from '../../services/genre_service'
import { MongoAdapter } from '../../adapters/mongo_adapter'
import settings from '../../core/settings'

class GenreAuthController extends Controller {
    rules = new Rules()
    handle(): Router {

        /** [GET] LIST PAGINATED GENRES */
        this.router.get('/', async (request: Request, response: Response, next: NextFunction) => {
            const handleResponser = this.getHandleResponser(response)
            try {
                const { pageNumber, pageSize, name } = request.query
                this.rules.validate(
                    pageNumber ? { pageNumber: pageNumber } : {},
                    pageSize ? { pageSize: pageSize } : {},
                    name ? { name } : {}
                )

                const mongoAdapter = new MongoAdapter()
                await mongoAdapter.connect()
                const genreService = new GenreService(mongoAdapter)

                const list = await genreService.list(Number(pageNumber ?? 1), Number(pageSize ?? settings.DEFAULT_PAGE_SIZE), { name: name?.toString() })
                await mongoAdapter.disconnect()

                return handleResponser.sendOk(list)
            } catch (err) {
                next(err)
            }
        })

        return this.router
    }
}

export default new GenreAuthController().handle()