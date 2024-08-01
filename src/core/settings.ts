import * as dotenv from 'dotenv'
dotenv.config()

class Settings {
    readonly IP = process.env.IP ?? ''
    readonly PORT = process.env.PORT ?? ''
    readonly JWT_SECRET = process.env.JWT_SECRET ?? ''
    readonly ENVIRONMENT = process.env.ENVIRONMENT ?? 'dev'
    readonly MAILER_USER = process.env.MAILER_USER ?? ''
    readonly MAILER_PASSWORD = process.env.MAILER_PASSWORD ?? ''

    isLocal() {
        return Boolean(this.ENVIRONMENT === 'dev')
    }
}

export default new Settings()