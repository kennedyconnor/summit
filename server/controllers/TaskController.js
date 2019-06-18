import TaskService from '../services/TaskService'
import express from 'express'
import { Authorize } from '../middleware/authorize'

let _service = new TaskService()
let _repo = _service.repository

export default class TaskController {
  constructor() {
    this.router = express.Router()
      .use(Authorize.authenticated)
      .get('', this.getAllTasks)
      .delete('/:id', this.deleteTask)
      .use(this.defaultRoute)
  }

  defaultRoute(req, res, next) {
    next({ status: 404, message: 'No such route' })
  }

  async getAllTasks(req, res, next) {
    try {
      let data = await _repo.find({})
      return res.send(data)
    } catch (error) { next(error) }
  }

  async deleteTask(req, res, next) {
    try {
      await _repo.findOneAndRemove({ _id: req.params.id, authorId: req.session.uid })
      return res.send("Successfully deleted")
    } catch (error) { next(error) }
  }
}