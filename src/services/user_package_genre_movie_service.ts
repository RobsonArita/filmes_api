import { GenreService } from './genre_service'
import { MovieAPIService } from './movie_api_service'
import { PackageService } from './package_service'
import { UserService } from './user_service'

export class UserPackageGenreMovieService {
    private readonly userService: UserService
    private readonly packageService: PackageService
    private readonly genreService: GenreService
    private readonly movieAPIService: MovieAPIService

    constructor(
        userService: UserService, 
        packageService: PackageService, 
        genreService: GenreService,
        movieAPIService: MovieAPIService
    ) {
        this.userService = userService
        this.packageService = packageService
        this.genreService = genreService
        this.movieAPIService = movieAPIService
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
}