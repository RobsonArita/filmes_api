// @ts-nocheck
import { GenreService } from '../../src/services/genre_service'
import GenreModel from '../../src/models/genre_model'
import { InvalidGenreException } from '../../src/core/exceptions'
import { MovieAPIService } from '../../src/services/movie_api_service'
import settings from '../../src/core/settings'

describe('GenreService', () => {
  let genreService: GenreService
  let mongoAdapterMock: any
  let movieAPIServiceMock: any

  beforeEach(() => {
    mongoAdapterMock = {
      fetchPaginatedGenres: jest.fn(),
      existsGenre: jest.fn(),
      createGenre: jest.fn(),
      upsertGenre: jest.fn(),
    }
    movieAPIServiceMock = {
      getGenres: jest.fn(),
    }
    genreService = new GenreService(mongoAdapterMock)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('list', () => {
    it('should return paginated genres', async () => {
      const filters = { name: 'Action' }
      const mockGenres = { data: ['genre1', 'genre2'], total: 2 }
      mongoAdapterMock.fetchPaginatedGenres.mockResolvedValue(mockGenres)

      const result = await genreService.list(1, settings.DEFAULT_PAGE_SIZE, filters)

      expect(result).toEqual(mockGenres)
      expect(mongoAdapterMock.fetchPaginatedGenres).toHaveBeenCalledWith(1, settings.DEFAULT_PAGE_SIZE, filters)
    })
  })

  describe('validate', () => {
    it('should throw InvalidGenreException if any genre ID does not exist', async () => {
      mongoAdapterMock.existsGenre.mockImplementation((id) => id === 'valid-id')

      await expect(genreService.validate(['valid-id', 'invalid-id'])).rejects.toMatchObject({
        code: 400,
        data: {
          message: 'Invalid genre(s).',
        },
      })
    })

    it('should not throw an exception if all genre IDs exist', async () => {
      mongoAdapterMock.existsGenre.mockResolvedValue(true)

      await expect(genreService.validate(['valid-id-1', 'valid-id-2'])).resolves.not.toThrow()
    })
  })

  describe('processDataSync', () => {
    it('should insert genres if none exist in the database', async () => {
      mongoAdapterMock.fetchPaginatedGenres.mockResolvedValue({ data: [] })
      movieAPIServiceMock.getGenres.mockResolvedValue({
        data: {
          genres: [{ apiId: '1', name: 'Action' }, { apiId: '2', name: 'Comedy' }],
        },
      })
      jest.spyOn(GenreModel, 'toModel').mockImplementation(genre => genre)
      
      await genreService.processDataSync(movieAPIServiceMock)

      expect(mongoAdapterMock.createGenre).toHaveBeenCalledWith([
        { apiId: '1', name: 'Action' },
        { apiId: '2', name: 'Comedy' },
      ])
    })

    it('should update genres if some exist in the database', async () => {
      mongoAdapterMock.fetchPaginatedGenres.mockResolvedValue({ data: [{ apiId: '1', name: 'Action' }] })
      movieAPIServiceMock.getGenres.mockResolvedValue({
        data: {
          genres: [{ apiId: '1', name: 'Action' }, { apiId: '2', name: 'Adventure' }],
        },
      })
      jest.spyOn(GenreModel, 'toModel').mockImplementation(genre => genre)

      await genreService.processDataSync(movieAPIServiceMock)

      expect(mongoAdapterMock.upsertGenre).toHaveBeenCalledWith({ apiId: '1', name: 'Action' })
      expect(mongoAdapterMock.upsertGenre).toHaveBeenCalledWith({ apiId: '2', name: 'Adventure' })
    })
  })
})
