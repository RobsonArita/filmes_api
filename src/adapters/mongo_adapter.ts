import mongoose, { MongooseUpdateQueryOptions, QueryOptions, SaveOptions } from 'mongoose'
import GenreModel, { IGenreFilters } from '../models/genre_model'
import GenreMongoDB, { IGenreDocument } from '../schemas/genre_schema'
import settings from '../core/settings'

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
}