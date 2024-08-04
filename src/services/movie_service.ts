import { Types } from 'mongoose'
import { MongoService } from '../core/mongo_service'
import MovieModel from '../models/movie_model'
import { UserMovieModel } from '../models/user_model'
import { MovieAPIService } from './movie_api_service'
import settings from '../core/settings'

export class MovieService extends MongoService {

    async upsertMovie(movie: MovieModel) {
        await this.mongoAdapter.upsertMovie(movie)
        const upsertedMovie = await this.mongoAdapter.findMovieById(movie.apiId)

        return upsertedMovie
    }

    async getMovieByApiId(movieId: number) {
        return await this.mongoAdapter.findMovieById(movieId)
    }

    async upsertUserMovie(userMovie: UserMovieModel) {
        return await this.mongoAdapter.upsertUserMovie(userMovie)
    }

    async unwatchMovie(userId: number, movieId: Types.ObjectId) {
        return await this.mongoAdapter.removeWatchedMovie(userId, movieId)
    }

    async getPaginatedUserMovies(page: number, pageSize: number = settings.DEFAULT_PAGE_SIZE) {
        return this.mongoAdapter.getPaginatedUserMovies(page, pageSize)
    }

    async getMoviesByIds(ids: Array<Types.ObjectId>) {
        return await this.mongoAdapter.getMoviesByIds(ids)
    }
}