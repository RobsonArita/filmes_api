import PostgressAdapter from '../adapters/postgres_adapter'
import PackageModel, { IPackage } from '../models/package_model'
import { AlreadyRegisteredPackageException, PackageNotFound, UserNotFound } from '../core/exceptions'

export class PackageService {
    private postgresAdapter: PostgressAdapter

    constructor(postgresAdapter: PostgressAdapter) {
        this.postgresAdapter = postgresAdapter
    }

    async create(pack: PackageModel) {
        const exists = await this.postgresAdapter.packageNameExists(pack.name)
        if (exists) throw new AlreadyRegisteredPackageException()

        const created = await this.postgresAdapter.createPackage(pack.name, pack.enabledThemes ?? [], pack.version)

        return created.id
    }

    getAvailableGenres(availablePackages: Array<IPackage> | undefined) {
        const genres = (availablePackages ?? []).map(pack => pack?.enabledThemes).flat()
        return genres.filter((genre): genre is number => !!genre)
    }

    async addUserPackage(userId: number, packageId: number) {
        const userExists = await this.postgresAdapter.existsUser(userId)
        if (!userExists) throw new UserNotFound()

        const packageExists = await this.postgresAdapter.existsPackage(packageId)
        if (!packageExists) throw new PackageNotFound()

        return await this.postgresAdapter.addPackageToUser(userId, packageId)
    }

    async removeUserPackage(userId: number, packageId: number) {
        const userExists = await this.postgresAdapter.existsUser(userId)
        if (!userExists) throw new UserNotFound()

        const packageExists = await this.postgresAdapter.existsPackage(packageId)
        if (!packageExists) throw new PackageNotFound()

        return await this.postgresAdapter.removePackageFromUser(userId, packageId)
    }

    async update(packageId: number, updateData: Partial<PackageModel>) {
        return await this.postgresAdapter.updatePackage({ id: packageId }, updateData)
    }

    async getPaginatedPackages(pageNumber: number, pageSize: number) {
        return await this.postgresAdapter.getPaginatedPackages(pageNumber, pageSize)
    }

    async countPackages() {
        return await this.postgresAdapter.countPackages()
    }
}
