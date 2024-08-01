import PostgressAdapter from '../adapters/postgres_adapter'

export abstract class Service {
    readonly postgresAdapter: PostgressAdapter

    constructor(postgresAdapter: PostgressAdapter) {
        this.postgresAdapter = postgresAdapter
    }
}