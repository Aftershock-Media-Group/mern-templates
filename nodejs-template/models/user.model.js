import mongoose, { Schema } from 'mongoose'
import generateUUID from '../utils/generateUUID'
import normalize from 'normalize-mongoose'

const schema = new Schema(
  {
    _id: { type: String, default: generateUUID },
    email: { type: String, require: true, index: true, unique: true },
    name: { type: String, require: true },
    role: { type: Number, default: 0 },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    toJSON: { getters: true },
  }
)

schema.plugin(normalize)

export const UserModel = mongoose.model('user', schema)
