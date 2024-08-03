import PostgressAdapter from '../adapters/postgres_adapter'
import { Procedure } from '../core/procedure'
import UserModel from '../models/user_model'
import { UserService } from '../services/user_service'

export class CreateUsersProcedure extends Procedure {
    async exec() {
        const postgressAdapter = new PostgressAdapter()
        const userService = new UserService(postgressAdapter)

        await this.createAdminUser(userService)
    }

    private async createAdminUser(userService: UserService) {
        const adminUser = UserModel.adminUser

        try {
            await userService.create(adminUser)
        } catch (err) {
            console.warn(err)
            return
        }

        console.info('Created admin user')
    }
}