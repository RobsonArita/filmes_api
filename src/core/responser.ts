import { Response } from 'express'

type TData = any

export default class Responser {
    private response: Response
    constructor(response: Response) {
        this.response = response
    }

    sendOk (data: TData) {
        this.response.status(200).json(data) 
    }

    sendBadRequest (data: TData) {
        this.response.status(400).json(data) 
    }

    sendInternalServerError (data: TData) {
        this.response.status(500).json(data) 
    }
}

