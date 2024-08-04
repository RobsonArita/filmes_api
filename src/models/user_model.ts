import { Types } from "mongoose"

export interface IUser {
    id?: number
    name: string
    email: string
    password: string
}

export interface IUserMovie {
    _id?: Types.ObjectId
    sqlId: number
    watchedMovies: Array<Types.ObjectId>
}

export class UserMovieModel {
    readonly sqlId: IUserMovie['sqlId']
    readonly watchedMovies: IUserMovie['watchedMovies']

    constructor(user: IUserMovie) {
        this.sqlId = user.sqlId
        this.watchedMovies = user.watchedMovies
    }

    get saveDb (): IUserMovie {
        return {
            sqlId: this.sqlId,
            watchedMovies: this.watchedMovies,
        }
    }
}

export default class UserModel {
    readonly id: IUser['id']
    readonly name: IUser['name']
    readonly email: IUser['email']
    readonly password: IUser['password']

    constructor(user: IUser) {
        this.id = user.id
        this.name = user.name
        this.email = user.email
        this.password = user.password
    }

    get saveDb (): IUser {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password,
        }
    }

    static adminUser = new UserModel({
        email: 'admin_user@robsonapi.com',
        name: 'admin',
        password: 'mock',
      })
}