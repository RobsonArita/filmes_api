import settings from '../core/settings'
import UserModel from '../models/user_model'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { sendEmail } from '../utils/email'
import { AlreadyRegisteredUserException, AutenticatedEmailNotFound, RegisteredEmailNotFound, UserNotFound } from '../core/exceptions'
import { PostgresService } from '../core/postgres_service'

export class UserService extends PostgresService {
    async create(user: UserModel) {
        const exists = await this.postgresAdapter.emailExists(user.email)
        if (exists) throw new AlreadyRegisteredUserException()

        const hashedPassword = await bcrypt.hash(user.password, 10)
        const created = await this.postgresAdapter.createUser(user.name, user.email, hashedPassword)

        return created.id
    }

    async autenticate(email: string, password: string) {
        const exists = await this.postgresAdapter.emailExists(email)
        if (!exists) throw new AutenticatedEmailNotFound()

        const user = await this.postgresAdapter.getUserByEmail(email, true)
        if (!user) throw new UserNotFound()

        const allowed = await bcrypt.compare(password, user.password)
        if (!allowed) throw new AutenticatedEmailNotFound()

        const token = jwt.sign({ email, name: user.name }, settings.JWT_SECRET, { expiresIn: '1h' })

        return {
            token,
            email: user.email,
            name: user.name
        }
    }

    async generatePasswordResetToken(email: string) {
        const exists = await this.postgresAdapter.emailExists(email)
        if (!exists) throw new RegisteredEmailNotFound()

        const user = await this.postgresAdapter.getUserByEmail(email)
        if (!user) throw new UserNotFound()

        const token = jwt.sign({ email }, settings.JWT_SECRET, { expiresIn: '1h' })
        const resetLink = `http://${settings.IP}:${settings.PORT}/reset-password?token=${token}`

        if (settings.isLocal()) {
            return {
                returning_token_since_is_local: token
            }
        }

        await sendEmail(
            email,
            'Password Reset Request',
            `Please click the following link to reset your password: ${resetLink}`
        )

        return { success: true }
    }

    async resetPassword(token: string, newPassword: string) {
        const decoded = jwt.verify(token, settings.JWT_SECRET) as { email: string }

        const user = await this.postgresAdapter.getUserByEmail(decoded.email)
        if (!user) throw new UserNotFound()

        const hashedPassword = await bcrypt.hash(newPassword, 10)
        await this.postgresAdapter.updateUser(
            { email: decoded.email },
            { password: hashedPassword },
        )
    }

}