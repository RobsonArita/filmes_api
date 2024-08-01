export interface IUser {
    id?: number
    name: string
    email: string
    password: string
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

    saveDb (): IUser {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password,
        }
    }
}