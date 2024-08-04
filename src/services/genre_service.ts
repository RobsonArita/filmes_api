import { InvalidGenreException } from '../core/exceptions'
import { MongoService } from '../core/mongo_service'
import settings from '../core/settings'
import GenreModel, { IGenre, IGenreFilters } from '../models/genre_model'
import { MovieAPIService } from './movie_api_service'

export class GenreService extends MongoService {
    async list (
        pageNumber: number = 1,
        pageSize: number = settings.DEFAULT_PAGE_SIZE,
        filters?: IGenreFilters,
    ) {
        return await this.mongoAdapter.fetchPaginatedGenres(pageNumber, pageSize, filters)
    }

    async validate(genresIds: Array<IGenre['apiId']>) {
        await Promise.all(genresIds.map(async(genreId) => {
            const exists = await this.mongoAdapter.existsGenre(genreId)
            if (!exists) throw new InvalidGenreException()
        }))
    }

    async processDataSync (movieAPIService: MovieAPIService) {
        const externalAPIGenres = (await (await movieAPIService.getGenres()).data).genres.map(genre => GenreModel.toModel(genre))
        const genres = await this.list()

        if (!genres.data.length) {
            await this.mongoAdapter.createGenre(externalAPIGenres)
            console.info('Genres inserted')
            return
        }

        await Promise.all(externalAPIGenres.map(async(genre) => {
            await this.mongoAdapter.upsertGenre(genre)
        }))

        console.info('Genres updated')
    }

    async getGenreIds() {
        return await this.mongoAdapter.getGenreIds()
    }
}