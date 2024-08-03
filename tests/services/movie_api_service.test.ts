// @ts-nocheck
import { MovieAPIService } from '../../src/services/movie_api_service'
import HttpAdapter from '../../src/adapters/http_adapter'
import settings from '../../src/core/settings'

jest.mock('../../src/adapters/http_adapter')

describe('MovieAPIService', () => {
  let movieAPIService: MovieAPIService
  let httpAdapterMock: jest.Mocked<HttpAdapter>

  beforeEach(() => {
    httpAdapterMock = new HttpAdapter(settings.MOVIE_API_URL) as jest.Mocked<HttpAdapter>
    movieAPIService = new MovieAPIService()
    movieAPIService['httpAdapter'] = httpAdapterMock // Inject the mock into the service
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('getGenres', () => {
    it('should fetch genres from the external API and return them', async () => {
      const mockGenres = {
        genres: [
          { apiId: '1', name: 'Action' },
          { apiId: '2', name: 'Comedy' }
        ]
      }
      httpAdapterMock.get.mockResolvedValue(mockGenres)

      const result = await movieAPIService.getGenres()

      expect(result).toEqual(mockGenres)
      expect(httpAdapterMock.get).toHaveBeenCalledWith(
        '/3/genre/movie/list?language=en',
        {
          headers: {
            Authorization: 'Bearer ' + settings.MOVIE_API_AUTH
          }
        }
      )
    })

    it('should handle errors when fetching genres', async () => {
      const errorMessage = 'API request failed'
      httpAdapterMock.get.mockRejectedValue(new Error(errorMessage))

      await expect(movieAPIService.getGenres()).rejects.toThrow(errorMessage)
    })
  })
})
