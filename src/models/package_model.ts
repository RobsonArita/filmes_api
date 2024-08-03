import { IGenre } from "./genre_model"
import UserModel from "./user_model"

export interface IPackage {
  id?: number
  name: string
  enabledThemes?: Array<IGenre['apiId']>
  createdAt?: Date
  updatedAt?: Date
  version: number
  users?: Array<UserModel['id']>
}

export default class PackageModel {
  readonly id: IPackage['id']
  readonly name: IPackage['name']
  readonly enabledThemes: IPackage['enabledThemes']
  readonly createdAt: IPackage['createdAt']
  readonly updatedAt: IPackage['updatedAt']
  readonly version: IPackage['version']
  readonly users: IPackage['users']

  constructor(package_: IPackage) {
      this.id = package_.id
      this.name = package_.name
      this.enabledThemes = package_.enabledThemes
      this.createdAt = package_.createdAt
      this.updatedAt = package_.updatedAt
      this.version = package_.version
      this.users = package_.users
  }

  get saveDb (): IPackage {
      return {
          id: this.id,
          name: this.name,
          enabledThemes: this.enabledThemes,
          createdAt: this.createdAt,
          updatedAt: this.updatedAt,
          version: this.version,
          users: this.users,
      }
  }
}