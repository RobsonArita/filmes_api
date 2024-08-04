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
    return await this.prisma.user.create({
      data: {
        name,
        email,
        password,
        createdAt: this.timeNow()
      },
    })
  }

  async emailExists(email: string): Promise<boolean> {
    const user = await await this.prisma.user.findUnique({
      where: { email }
    })
    return user !== null
  }

  async getUserById(userId: number, omitPassword: boolean = true): Promise<Omit<User, 'password'> | null> {
    return await this.prisma.user.findUnique({
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
    return await this.prisma.user.findUnique({
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
    return await this.prisma.user.update({
      where,
      data: { ...data, updatedAt: this.timeNow() },
    })
  }

  async deleteUser(userId: number): Promise<User> {
    return await this.prisma.user.delete({
      where: { id: userId },
    })
  }

  async existsUser(userId: number): Promise<boolean> {
    return Boolean(await this.prisma.user.findUnique({ where: { id: userId } }))
  }

  async existsPackage(packageId: number): Promise<boolean> {
    return Boolean(await this.prisma.package.findUnique({ where: { id: packageId } }))
  }

  async getUserPackages(userId: number) {
    return await this.prisma.user.findUnique({
      where: { id: userId },
      include: { packages: true }
    })
  }

  async createPackage(name: string, enabledThemes: number[], version: number = 1) {
    return await this.prisma.package.create({
      data: {
        name,
        enabledThemes,
        version,
        createdAt: this.timeNow(),
      },
    })
  }

  async packageNameExists(name: string): Promise<boolean> {
    const pack = await this.prisma.package.findFirst({
      where: { name },
    })
    return pack !== null
  }

  async updatePackage(where: { id: number }, data: Partial<Package>): Promise<Package> {
    return await this.prisma.package.update({
      where,
      data: { ...data, updatedAt: this.timeNow() },
    })
  }

  async addUserToPackage(userId: number, packageId: number) {
    return await this.prisma.package.update({
      where: { id: packageId },
      data: {
        users: {
          connect: { id: userId },
        },
      },
    })
  }

  async addPackageToUser(userId: number, packageId: number) {
    return await this.prisma.user.update({
      where: { id: userId },
      data: {
        packages: {
          connect: { id: packageId },
        },
      },
    })
  }

  async removePackageFromUser(userId: number, packageId: number) {
    return await this.prisma.user.update({
      where: { id: userId },
      data: {
        packages: {
          disconnect: { id: packageId },
        },
      },
    })
  }

  async getPaginatedPackages(pageNumber: number, pageSize: number): Promise<(Package & { users: Omit<User, 'password'>[] })[]> {
    const offset = (pageNumber - 1) * pageSize
    return await this.prisma.package.findMany({
      skip: offset,
      take: pageSize,
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    })
  }

  async countPackages(): Promise<number> {
    return await this.prisma.package.count()
  }

  async getPaginatedUsers(pageNumber: number, pageSize: number): Promise<Omit<User, 'password'>[]> {
    const offset = (pageNumber - 1) * pageSize
    return await this.prisma.user.findMany({
      skip: offset,
      take: pageSize,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        packages: true
      },
    })
  }

  async countUsers(): Promise<number> {
    return await this.prisma.user.count()
  }
}


export default PostgressAdapter 