import * as dotenv from 'dotenv'
import { isTrue } from '../utils/validator'
dotenv.config()

class Settings {
    readonly IP = process.env.IP ?? ''
    readonly PORT = process.env.PORT ?? ''
    readonly JWT_SECRET = process.env.JWT_SECRET ?? ''
    readonly ENVIRONMENT = process.env.ENVIRONMENT ?? 'dev'
    readonly MAILER_USER = process.env.MAILER_USER ?? ''
    readonly MAILER_PASSWORD = process.env.MAILER_PASSWORD ?? ''
    readonly RUN_PROCEDURES = isTrue(process.env.RUN_PROCEDURES)
    readonly RUN_ROUTINES = isTrue(process.env.RUN_ROUTINES)
    readonly MONGO_URI = process.env.MONGO_URI ?? ''
    readonly MOVIE_API_URL = 'https://api.themoviedb.org'
    readonly MOVIE_API_AUTH = this.getMovieAPIAuth()
    readonly DEFAULT_PAGE_SIZE = 10

    getMovieAPIAuth() {
        switch (this.ENVIRONMENT) {
            case 'dev': return 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzRkM2FkODZjZTA1OTRiZDRjZTI3ZDJhNDNjODhmMSIsIm5iZiI6MTcyMjcwOTg0Ny40NDkxMTgsInN1YiI6IjY2YWU3NWQyNjU5Y2JhMDM5YmIyZDMzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ipsQohqZRYZrQ3ABTC99M0NSoObQldNFq_Wb5ULshJ8'
            default: return 'not_created'
        }
    }

    isLocal() {
        return Boolean(this.ENVIRONMENT === 'dev')
    }
}

export default new Settings()