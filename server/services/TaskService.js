import mongoose from 'mongoose'

let ObjectId = mongoose.Schema.Types.ObjectId

let _schema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  points: { type: Number, required: true },
  tags: [{ type: String, enum: ["Health", "Organization", "Hygiene", "Finances"] }]
})

export default class TaskService {
  get repository() {
    return mongoose.model('task', _schema)
  }
}