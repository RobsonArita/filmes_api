import mongoose, { MongooseUpdateQueryOptions, QueryOptions, SaveOptions, Types } from 'mongoose'
import GenreModel, { IGenreFilters } from '../models/genre_model'
import GenreMongoDB, { IGenreDocument } from '../schemas/genre_schema'
import settings from '../core/settings'
import MovieModel, { IMovie } from '../models/movie_model'
import MovieMongoDB from '../schemas/movie_schema'
import { IUserMovie, UserMovieModel } from '../models/user_model'
import UserMovieMongoDB, { IUserMovieDocument } from '../schemas/user_movie_schema'

export interface PaginationType<T> {
    data: Array<T>
    pagination: {
        pageNumber: number
        pageSize: number
        totalPages: number
        lastPage: boolean
        firstPage: boolean
    }
}

export class MongoAdapter {
    async connect() {
        await mongoose.connect(settings.MONGO_URI)
    }

    async disconnect() {
        await mongoose.disconnect()
    }

    async createGenre(genres: Array<GenreModel>, options?: SaveOptions) {
        const saveGenres = genres.map(genre => genre.saveDb)
        const createResponse = await GenreMongoDB.create(saveGenres, options)

        return createResponse
    }

    async upsertGenre(genre: GenreModel) {
        const saveGenre = genre.saveDb
        const upsertResponse = await GenreMongoDB.updateOne({ apiId: saveGenre.apiId }, saveGenre, { upsert: true })
        return upsertResponse
    }


    async existsGenre(apiId: number) {
        return Boolean(await GenreMongoDB.exists({ apiId }))
    }

    async getGenreIds() {
        const genres = await GenreMongoDB.find()
        return genres.map(genre => genre.apiId)
    }

    async getGenreById(id: number) {
        const genre = await GenreMongoDB.findOne({ apiId: id })
        return genre
    }

    async fetchPaginatedGenres(
        pageNumber: number,
        pageSize: number,
        filters?: IGenreFilters,
    ): Promise<PaginationType<IGenreDocument>> {
        const skip = (pageNumber - 1) * pageSize

        const query: any = {}
        if (filters?.name) {
            query.name = { $regex: filters.name, $options: 'i' }
        }
        const totalCount = await GenreMongoDB.countDocuments(query)

        const data = await GenreMongoDB.find(query).skip(skip).limit(pageSize).select('-__v')
        const totalPages = Math.ceil(totalCount / pageSize)

        return {
            data,
            pagination: {
                pageNumber,
                pageSize,
                totalPages,
                lastPage: pageNumber >= totalPages,
                firstPage: pageNumber === 1,
            },
        }
    }

    async upsertMovie(movie: MovieModel) {
        const saveMovie = movie.saveDb
        const upsertResponse = await MovieMongoDB.updateOne({ apiId: saveMovie.apiId }, saveMovie, { upsert: true })
        return upsertResponse
    }

    async findMovieById(movieId: IMovie['apiId']) {
        const movie = await MovieMongoDB.findOne({ apiId: movieId })
        return movie
    }

    async upsertUserMovie(userMovie: UserMovieModel) {
        const saveUserMovie = userMovie.saveDb

        const upsertResponse = await UserMovieMongoDB.updateOne(
            { sqlId: saveUserMovie.sqlId },
            {
                $addToSet: {
                    watchedMovies: { $each: saveUserMovie.watchedMovies }
                }
            },
            { upsert: true }
        )

        return upsertResponse
    }

    async removeWatchedMovie(userId: number, movieId: Types.ObjectId) {
        return await UserMovieMongoDB.updateOne(
            { sqlId: userId },
            {
                $pull: {
                    watchedMovies: movieId
                }
            }
        )
    }

    async getPaginatedUserMovies(page: number, pageSize: number): Promise<{
        data: Array<IUserMovieDocument>
        pagination: {
            pageNumber: number
            pageSize: number
            totalPages: number
            totalItems: number
            firstPage: boolean
            lastPage: boolean
        }
    }> {
        const totalItems = await UserMovieMongoDB.countDocuments()
        const totalPages = Math.ceil(totalItems / pageSize)
        const skip = (page - 1) * pageSize

        const userMovies = await UserMovieMongoDB.find()
            .skip(skip)
            .limit(pageSize)
            .exec()

        return {
            data: userMovies,
            pagination: {
                pageNumber: page,
                pageSize: pageSize,
                totalPages: totalPages,
                totalItems: totalItems,
                firstPage: page === 1,
                lastPage: page === totalPages
            }
        }
    }

    async getMoviesByIds(ids: Array<Types.ObjectId>) {
        return await MovieMongoDB.find({ _id: { $in: ids } }).exec()
    }
}