// Importando PrismaClient do pacote @prisma/client
import { PrismaClient, User } from '@prisma/client'

interface IPostgresAdapter {
    createUser(name: string, email: string, password: string): Promise<User>
    getUserById(userId: number): Promise<User | null>
    updateUser(userId: number, data: Partial<User>): Promise<User>
    deleteUser(userId: number): Promise<User>
}

class PostgressAdapter implements IPostgresAdapter {
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

    async getUserById(userId: number): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { id: userId },
        })
    }

    async updateUser(userId: number, data: Partial<User>): Promise<User> {
        return this.prisma.user.update({
            where: { id: userId },
            data: { ...data, updatedAt: this.timeNow() },
        })
    }

    async deleteUser(userId: number): Promise<User> {
        return this.prisma.user.delete({
            where: { id: userId },
        })
    }
}

// // Uso do adapter
// (async () => {
//   const dbAdapter = new PrismaDatabaseAdapter()

//   // Criar um usuário
//   const newUser = await dbAdapter.createUser('Alice', 'alice@example.com')
//   console.log('Created User:', newUser)

//   // Buscar um usuário por ID
//   const user = await dbAdapter.getUserById(newUser.id)
//   console.log('Fetched User:', user)

//   // Atualizar um usuário
//   const updatedUser = await dbAdapter.updateUser(newUser.id, { name: 'Alice Updated' })
//   console.log('Updated User:', updatedUser)

//   // Deletar um usuário
//   const deletedUser = await dbAdapter.deleteUser(newUser.id)
//   console.log('Deleted User:', deletedUser)
// })()

export default new PostgressAdapter