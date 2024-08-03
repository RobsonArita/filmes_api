import { Document, Schema, Model, model } from 'mongoose'
import { IGenre } from '../models/genre_model'


export interface IGenreDocument extends Omit<IGenre, '_id'>, Document {}

const genreSchema: Schema<IGenreDocument> = new Schema({
  name: { type: String, required: true },
  apiId: { type: Number, required: true }
})

const GenreMongoDB: Model<IGenreDocument> = model<IGenreDocument>('Genre', genreSchema)

export default GenreMongoDB
