import { AlreadyRegisteredPackageException } from '../core/exceptions'
import { Service } from '../core/service'
import PackageModel from '../models/package_model'

export class PackageService extends Service {
    async create(pack: PackageModel) {
        const exists = await this.postgresAdapter.emailExists(pack.name)
        if (exists) throw new AlreadyRegisteredPackageException()

        const created = await this.postgresAdapter.createPackage(pack.name, pack.enabledThemes ?? [], pack.version)

        return created.id
  }
}