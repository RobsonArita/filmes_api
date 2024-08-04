import { Document, Schema, Model, model } from 'mongoose'
import { IMovie } from '../models/movie_model'


export interface IMovieDocument extends Omit<IMovie, '_id'>, Document {}

const movieSchema: Schema<IMovieDocument> = new Schema({
  name: { type: String, required: true },
  apiId: { type: Number, required: true },
  genres: { type: [Number], required: true }
})

const MovieMongoDB: Model<IMovieDocument> = model<IMovieDocument>('Movie', movieSchema)

export default MovieMongoDB
