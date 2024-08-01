import { PrismaClient, User } from '@prisma/client'


class PostgressAdapter {
    private prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient()
    }

    private timeNow() {
        return new Date()
    }

    async createUser(name: string, email: string, password: string) {
        return this.prisma.user.create({
            data: {
                name,
                email,
                password,
                createdAt: this.timeNow()
            },
        })
    }

    async emailExists(email: string): Promise<boolean> {
        const user = await this.prisma.user.findUnique({
          where: { email }
        })
        return user !== null
    }

    async getUserById(userId: number, omitPassword: boolean = true): Promise<Omit<User, 'password'> | null> {
        return this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true,
                password: omitPassword
            },
        })
    }

    async getUserByEmail(email: string, selectPassword: boolean = false) {
        return this.prisma.user.findUnique({
            where: { email: email },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true,
                password: selectPassword
            },
        })
    }

    async updateUser(where: any, data: Partial<User>): Promise<User> {
        return this.prisma.user.update({
            where,
            data: { ...data, updatedAt: this.timeNow() },
        })
    }

    async deleteUser(userId: number): Promise<User> {
        return this.prisma.user.delete({
            where: { id: userId },
        })
    }
}


export default PostgressAdapter 