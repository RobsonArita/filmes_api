import HttpAdapter from "../adapters/http_adapter"
import { ExternalCommunicationException } from "../core/exceptions"
import settings from "../core/settings"
import { IExternalAPIGenre } from "../models/genre_model"
import { IExternalMovieList } from "../models/movie_model"

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

    private defaultPaginated() {
        return {
            data: [],
            pagination: {
                pageNumber: 0,
                pageSize: settings.DEFAULT_PAGE_SIZE,
                totalPages: 0,
                lastPage: true,
                firstPage: true,
            }
        }
    }

    async getPaginatedMovies(
        filteredGenres: Array<number>,
        excludedGenres: Array<number>,
        pageNumber: number = 1
    ) {
        try {
            const { data } = await this.httpAdapter.get<IExternalMovieList>('/3/discover/movie', {
                params: {
                    with_genres: filteredGenres.join(','),
                    without_genres: excludedGenres.join(','),
                    page: pageNumber,
                },
                headers: {
                    Authorization: 'Bearer ' + settings.MOVIE_API_AUTH
                }
            })

            const movies = data.results
            const totalPages = data.total_pages

            return {
                data: movies,
                pagination: {
                    pageNumber,
                    pageSize: settings.DEFAULT_PAGE_SIZE,
                    totalPages,
                    lastPage: pageNumber === totalPages,
                    firstPage: pageNumber === 1,
                }
            }
        } catch (err: any) {
            console.warn(err)
            if (err.response?.status === 404) return this.defaultPaginated()
            throw new ExternalCommunicationException()
        }
    }
}