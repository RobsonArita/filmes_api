import { Types } from "mongoose"

export interface IExternalMovie {
    adult: boolean
    backdrop_path: string
    genre_ids: Array<number>
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: Date
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}

export interface IExternalMovieList {
    page: number
    results: Array<IExternalMovie>
    total_pages: number
    total_results: number
}

export interface IMovie {
    _id?: Types.ObjectId
    apiId: number
    genres: Array<number>
    name: string
}

export default class MovieModel {
    readonly _id: IMovie['_id']
    readonly apiId: IMovie['apiId']
    readonly genres: IMovie['genres']
    readonly name: IMovie['name']

    constructor(movie: IMovie) {
        this._id = movie._id
        this.apiId = movie.apiId
        this.genres = movie.genres
        this.name = movie.name
    }

    get saveDb (): IMovie {
        return {
            _id: this._id,
            apiId: this.apiId,
            genres: this.genres,
            name: this.name,
        }
    }
}