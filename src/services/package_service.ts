import { AlreadyRegisteredPackageException } from '../core/exceptions'
import { PostgresService } from '../core/postgres_service'
import PackageModel from '../models/package_model'

export class PackageService extends PostgresService {
    async create(pack: PackageModel) {
        const exists = await this.postgresAdapter.packageNameExists(pack.name)
        if (exists) throw new AlreadyRegisteredPackageException()

        const created = await this.postgresAdapter.createPackage(pack.name, pack.enabledThemes ?? [], pack.version)

        return created.id
  }
}