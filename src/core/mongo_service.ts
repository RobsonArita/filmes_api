import { MongoAdapter } from '../adapters/mongo_adapter'

export class MongoService {
    readonly mongoAdapter: MongoAdapter

    constructor(mongoAdapter: MongoAdapter) {
        this.mongoAdapter = mongoAdapter
    }
}

