import { MongoAdapter } from '../adapters/mongo_adapter'
import { Procedure } from '../core/procedure'
import { GenreService } from '../services/genre_service'
import { MovieAPIService } from '../services/movie_api_service'

export class CreateGenresProcedure extends Procedure {
    async exec() {
        const mongoAdapter = new MongoAdapter()
        await mongoAdapter.connect()
        await new GenreService(mongoAdapter).processDataSync(new MovieAPIService())
        await mongoAdapter.disconnect()
    }
}