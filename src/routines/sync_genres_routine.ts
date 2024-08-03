import { MongoAdapter } from "../adapters/mongo_adapter"
import { GenreService } from "../services/genre_service"
import { MovieAPIService } from "../services/movie_api_service"

export const SyncGenresRoutines = async () =>  {
    console.info('==== BEGIN SyncGenresRoutines ====')
    try {
        const mongoAdapter = new MongoAdapter()
        await mongoAdapter.connect()
        await new GenreService(mongoAdapter).processDataSync(new MovieAPIService())
        await mongoAdapter.disconnect()
    } catch (err) {
        console.warn(err)
    }
    console.info('==== END SyncGenresRoutines ====')
}