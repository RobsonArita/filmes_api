import { PrismaClient, User, Package } from '@prisma/client'


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
            where: { email },
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

    async createPackage(name: string, enabledThemes: string[], version: number = 1) {
        return this.prisma.package.create({
            data: {
                name,
                enabledThemes,
                version,
                createdAt: this.timeNow()
            },
        })
    }

    async packageNameExists(name: string): Promise<boolean> {
        const pack = await this.prisma.user.findFirst({
          where: { name }
        })
        return pack !== null
    }

    async updatePackage(where: { id: number }, data: Partial<Package>): Promise<Package> {
        return this.prisma.package.update({
            where,
            data: { ...data, updatedAt: this.timeNow() },
        })
    }

    async getPackageById(packageId: number): Promise<Package | null> {
        return this.prisma.package.findUnique({
            where: { id: packageId },
        })
    }

    async getPackageByName(name: string): Promise<Package | null> {
        return this.prisma.package.findFirst({
            where: { name },
        })
    }

    async addUserToPackage(userId: number, packageId: number) {
        return this.prisma.package.update({
            where: { id: packageId },
            data: {
                users: {
                    connect: { id: userId },
                },
            },
        })
    }

    async addPackageToUser(packageId: number, userId: number) {
        return this.prisma.user.update({
            where: { id: userId },
            data: {
                packages: {
                    connect: { id: packageId },
                },
            },
        })
    }
    
}


export default PostgressAdapter 