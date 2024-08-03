// @ts-nocheck
import { PackageService } from '../../src/services/package_service'
import PackageModel from '../../src/models/package_model'
import { AlreadyRegisteredPackageException } from '../../src/core/exceptions'

describe('PackageService', () => {
  let packageService: PackageService
  let postgresAdapterMock: any

  beforeEach(() => {
    postgresAdapterMock = {
      packageNameExists: jest.fn(),
      createPackage: jest.fn(),
    }
    packageService = new PackageService(postgresAdapterMock)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('create', () => {
    it('should throw AlreadyRegisteredPackageException if package name already exists', async () => {
      postgresAdapterMock.packageNameExists.mockResolvedValue(true)

      const packageModel = new PackageModel({
        name: 'Package Name',
        enabledThemes: ['theme1'],
        version: '1.0.0',
      })

      await expect(packageService.create(packageModel)).rejects.toMatchObject({ code: 400, data: { message: 'Name from package already exists.' } })
    })

    it('should create a package and return the package id', async () => {
      postgresAdapterMock.packageNameExists.mockResolvedValue(false)
      postgresAdapterMock.createPackage.mockResolvedValue({ id: 'package-id' })

      const packageModel = new PackageModel({
        name: 'Package Name',
        enabledThemes: ['theme1'],
        version: '1.0.0',
      })

      const packageId = await packageService.create(packageModel)

      expect(packageId).toBe('package-id')
      expect(postgresAdapterMock.createPackage).toHaveBeenCalledWith(
        'Package Name',
        ['theme1'],
        '1.0.0'
      )
    })
  })
})
