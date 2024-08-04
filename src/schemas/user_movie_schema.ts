import { Document, Schema, Model, model, Types } from 'mongoose'
import { IUserMovie } from '../models/user_model'


export interface IUserMovieDocument extends Omit<IUserMovie, '_id'>, Document {}

const userMovieSchema: Schema<IUserMovieDocument> = new Schema({
  sqlId: { type: Number, required: true },
  watchedMovies: { type: [Types.ObjectId], required: true }
})

const UserMovieMongoDB: Model<IUserMovieDocument> = model<IUserMovieDocument>('UserMovie', userMovieSchema)

export default UserMovieMongoDB
