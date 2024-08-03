import HttpAdapter from "../adapters/http_adapter";
import settings from "../core/settings";
import { IExternalAPIGenre } from "../models/genre_model";

export class MovieAPIService {
    private readonly httpAdapter: HttpAdapter

    constructor() {
        this.httpAdapter = new HttpAdapter(settings.MOVIE_API_URL)
    }

    async getGenres() {
        return await this.httpAdapter.get<Promise<{ genres: Array<IExternalAPIGenre> }>>(
            '/3/genre/movie/list?language=en',
            {
                headers: {
                    Authorization: 'Bearer ' + settings.MOVIE_API_AUTH
                }
            }
        )
    }
}