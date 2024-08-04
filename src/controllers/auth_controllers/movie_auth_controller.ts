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
import { MovieService } from '../../services/movie_service'
import adminMiddleware from '../../middlewares/admin_middleware'

class MovieAuthController extends Controller {
    rules = new Rules()
    handle(): Router {
        /** [GET] LIST USERS MOVIE REPORT */
        this.router.get('/report', adminMiddleware, async (request: Request, response: Response, next: NextFunction) => {
            const handleResponser = this.getHandleResponser(response)
            try {
                const { pageNumber } = request.query
                this.rules.validate(
                    pageNumber ? { pageNumber: pageNumber } : {},
                )

                const mongoAdapter = new MongoAdapter()
                await mongoAdapter.connect()
                const postgresAdapter = new PostgressAdapter()

                const userPackageGenreMovieService = new UserPackageGenreMovieService(
                    new UserService(postgresAdapter),
                    new PackageService(postgresAdapter),
                    new GenreService(mongoAdapter),
                    new MovieAPIService(),
                    new MovieService(mongoAdapter)
                )

                const report = await userPackageGenreMovieService.report(Number(pageNumber ?? 1))

                await mongoAdapter.disconnect()

                return handleResponser.sendOk(report)
            } catch (err) {
                next(err)
            }
        })

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
                    new MovieAPIService(),
                    new MovieService(mongoAdapter)
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

        /** [PATCH] ADD FAVORITE */
        this.router.patch('/watch', async (request: Request, response: Response, next: NextFunction) => {
            const handleResponser = this.getHandleResponser(response)
            try {
                const { movieId } = request.body
                this.rules.validate(
                    { movieId: movieId }
                )

                const mongoAdapter = new MongoAdapter()
                await mongoAdapter.connect()
                const postgresAdapter = new PostgressAdapter()

                const userPackageGenreMovieService = new UserPackageGenreMovieService(
                    new UserService(postgresAdapter),
                    new PackageService(postgresAdapter),
                    new GenreService(mongoAdapter),
                    new MovieAPIService(),
                    new MovieService(mongoAdapter)
                )

                await userPackageGenreMovieService.watched(
                    request.user?.id as number,
                    parseInt(movieId as string, 0) || 0
                )

                await mongoAdapter.disconnect()

                return handleResponser.sendOk({ message: 'ok' })
            } catch (err) {
                next(err)
            }
        })

        /** [PATCH] ADD FAVORITE */
        this.router.patch('/unwatch', async (request: Request, response: Response, next: NextFunction) => {
            const handleResponser = this.getHandleResponser(response)
            try {
                const { movieId } = request.body
                this.rules.validate(
                    { movieId: movieId }
                )

                const mongoAdapter = new MongoAdapter()
                await mongoAdapter.connect()
                const postgresAdapter = new PostgressAdapter()

                const userPackageGenreMovieService = new UserPackageGenreMovieService(
                    new UserService(postgresAdapter),
                    new PackageService(postgresAdapter),
                    new GenreService(mongoAdapter),
                    new MovieAPIService(),
                    new MovieService(mongoAdapter)
                )

                await userPackageGenreMovieService.unwatch(
                    request.user?.id as number,
                    parseInt(movieId as string, 0) || 0
                )

                await mongoAdapter.disconnect()

                return handleResponser.sendOk({ message: 'ok' })
            } catch (err) {
                next(err)
            }
        })

        return this.router
    }
}

export default new MovieAuthController().handle()