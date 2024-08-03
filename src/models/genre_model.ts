import { Types } from 'mongoose'

export interface IGenre {
    _id?: Types.ObjectId

    apiId: number
    name: string
}

export interface IExternalAPIGenre {
    id: number
    name: string
}

export interface IGenreFilters {
    name?: string
}

export default class GenreModel {
    readonly _id: IGenre['_id']
    readonly apiId: IGenre['apiId']
    readonly name: IGenre['name']

    constructor(genre: IGenre) {
        this._id = genre._id
        this.apiId = genre.apiId
        this.name = genre.name
    }

    get saveDb (): IGenre {
        return {
            _id: this._id,
            apiId: this.apiId,
            name: this.name,
        }
    }

    static toModel(externalAPIGenre: IExternalAPIGenre) {
        return new GenreModel({
            apiId: externalAPIGenre.id,
            name: externalAPIGenre.name
        })
    }
}