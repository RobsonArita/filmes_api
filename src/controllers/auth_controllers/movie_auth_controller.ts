import { NextFunction, Request, Response, Router } from 'express'
import { Controller } from '../../core/controller'
import Rules from '../../core/rules'
import { GenreService } from '../../services/genre_service'
import { MongoAdapter } from '../../adapters/mongo_adapter'
import { UserPackageGenreMovieService } from '../../services/user_package_genre_movie_service'
import PostgressAdapter from '../../adapters/postgres_adapter'
import { UserService } from '../../services/user_service'
import { PackageService } from '../../services/package_service'
import { MovieAPIService } from '../../services/movie_api_service'

class MovieAuthController extends Controller {
    rules = new Rules()
    handle(): Router {

        /** [GET] LIST PAGINATED MOVIES */
        this.router.get('/', async (request: Request, response: Response, next: NextFunction) => {
            const handleResponser = this.getHandleResponser(response)
            try {
                const { pageNumber, genres } = request.query
                this.rules.validate(
                    pageNumber ? { pageNumber: pageNumber } : {},
                    genres ? { genres: genres } : {},
                )

               const mongoAdapter = new MongoAdapter()
                await mongoAdapter.connect()
                const postgresAdapter = new PostgressAdapter()

                const userPackageGenreMovieService = new UserPackageGenreMovieService(
                    new UserService(postgresAdapter),
                    new PackageService(postgresAdapter),
                    new GenreService(mongoAdapter),
                    new MovieAPIService()
                )

                const list = await userPackageGenreMovieService.listMovies(
                    request.user?.id as number,
                    genres?.toString()?.split(',')?.map(Number) ?? [],
                    Number(pageNumber ?? 1)
                )

                await mongoAdapter.disconnect()

                return handleResponser.sendOk(list)
            } catch (err) {
                next(err)
            }
        })

        return this.router
    }
}

export default new MovieAuthController().handle()