import mongoose from 'mongoose'
import TasksService from './TasksService'

let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let _taskRepo = new TaskService().repository

let _schema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  taskIds: [{ type: ObjectId, ref: "tasks" }],
  completed: { type: Boolean, required: true, default: false }
})

_schema.pre('remove', function (next) {
  this._id
  Promise.all([
    _taskRepo.deleteMany({ goalId: this._id }) //needs rewritting
  ])
    .then(() => next())
    .catch(err => next(err))
})

export default class GoalService {
  get repository() {
    return mongoose.model('Goal', _schema)
  }
}