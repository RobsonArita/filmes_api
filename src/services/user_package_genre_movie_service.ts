import { Types } from 'mongoose'
import { MovieNotFound } from '../core/exceptions'
import MovieModel from '../models/movie_model'
import { IUserMovie, UserMovieModel } from '../models/user_model'
import { GenreService } from './genre_service'
import { MovieAPIService } from './movie_api_service'
import { MovieService } from './movie_service'
import { PackageService } from './package_service'
import { UserService } from './user_service'
import { IUserMovieDocument } from '../schemas/user_movie_schema'

type reportData = {
    userId: number | string
    totalFilmsWatched: number
    mostWatchedTheme: {
        themeId: number | string
        themeName: string
        totalFilmsWatched: number
    } | null
    lastFilmWatched: {
        movieId: number | string
        movieName: string
    } | null
}

export class UserPackageGenreMovieService {
    private readonly userService: UserService
    private readonly packageService: PackageService
    private readonly genreService: GenreService
    private readonly movieAPIService: MovieAPIService
    private readonly movieService: MovieService

    constructor(
        userService: UserService,
        packageService: PackageService,
        genreService: GenreService,
        movieAPIService: MovieAPIService,
        movieService: MovieService
    ) {
        this.userService = userService
        this.packageService = packageService
        this.genreService = genreService
        this.movieAPIService = movieAPIService
        this.movieService = movieService
    }

    async listMovies(userId: number, filterGenreIds: Array<number>, page?: number) {
        const availabePackages = await this.userService.getAvailablePackages(userId)
        const availabeGenreIds = this.packageService.getAvailableGenres(availabePackages)
        const allGenreIds = await this.genreService.getGenreIds()

        const notAvailableGenreIds = allGenreIds.filter(
            (genreId) => !availabeGenreIds.includes(genreId)
        )
        const movies = await this.movieAPIService.getPaginatedMovies(
            filterGenreIds,
            notAvailableGenreIds,
            page
        )

        return movies
    }

    async watched(userId: number, movieId: number) {
        const movie = await this.movieAPIService.getMovieById(movieId)

        const availabePackages = await this.userService.getAvailablePackages(userId)
        const availabeGenreIds = this.packageService.getAvailableGenres(availabePackages)

        const movieGenreIds = movie.genres.map((genre: { id: number }) => genre.id)

        const hasAllGenresAvailable = movieGenreIds.every((genreId: number) => availabeGenreIds.includes(genreId))

        if (!hasAllGenresAvailable) throw new MovieNotFound()

        const movieModel = new MovieModel({
            apiId: movie.id,
            genres: movie.genres?.map((genre: { id: number }) => genre.id) ?? [],
            name: movie.title
        })

        const upsertedId = await this.movieService.upsertMovie(movieModel)
        if (!upsertedId) throw new MovieNotFound()

        const userMovieModel = new UserMovieModel({
            sqlId: userId,
            watchedMovies: [upsertedId._id as Types.ObjectId]
        })

        await this.movieService.upsertUserMovie(userMovieModel)
    }

    async unwatch(userId: number, movieId: number) {
        const movie = await this.movieService.getMovieByApiId(movieId)
        if (!movie) throw new MovieNotFound()

        return await this.movieService.unwatchMovie(userId, movie._id as Types.ObjectId)
    }

    async report(page: number) {
        const userMovies = await this.movieService.getPaginatedUserMovies(page)
        const factoredDocs = await Promise.all(userMovies.data.map(async(userMovie) => await this.userMovieFactory(userMovie)))

        return { ...userMovies, data: factoredDocs }
    }

    private async userMovieFactory(userMovie: IUserMovieDocument): Promise<reportData> {
        const userId = userMovie.sqlId
        const movies = await this.movieService.getMoviesByIds(userMovie.watchedMovies)
        const totalFilmsWatched = movies.length
    
        const genreCount: { [key: number]: number } = {}
        movies.forEach(movie => {
            movie.genres.forEach(genre => {
                genreCount[genre] = (genreCount[genre] || 0) + 1
            })
        })
    
        let mostWatchedTheme: reportData['mostWatchedTheme'] | null = null
        for (const [themeId, count] of Object.entries(genreCount)) {
            const theme = await this.genreService.getGenreNameById(Number(themeId))
            if (!mostWatchedTheme || count > mostWatchedTheme.totalFilmsWatched) {
                mostWatchedTheme = {
                    themeId,
                    themeName: theme ?? 'unknown',
                    totalFilmsWatched: count
                }
            }
        }
    
        const lastFilmWatched: reportData['lastFilmWatched'] | null = movies.length > 0
            ? {
                movieId: movies[movies.length - 1].apiId,
                movieName: movies[movies.length - 1].name
            }
            : null
    
        return {
            userId,
            totalFilmsWatched,
            mostWatchedTheme: mostWatchedTheme || { themeId: 'unknown', themeName: 'Unknown', totalFilmsWatched: 0 },
            lastFilmWatched
        }
    }
    
}