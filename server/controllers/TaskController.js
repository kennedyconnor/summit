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
      .get('/:id', this.getTaskById)
      .get('/tags/:id', this.getTaskByTag)
      .post('', this.createTask)
      .put('/:id', this.editTask)
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

  async getTaskById(req, res, next) {
    try {
      let data = await _repo.find({ _id: req.params.id })
      return res.send(data)
    } catch (error) { next(error) }
  }

  async getTaskByTag(req, res, next) {
    try {
      let data = await _repo.find({ tags: { $in: [req.params.id] } })
      return res.send(data)
    } catch (error) { next(error) }
  }

  async createTask(req, res, next) {
    try {
      let data = await _repo.create(req.body)
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }

  async deleteTask(req, res, next) {
    try {
      await _repo.findOneAndRemove({ _id: req.params.id })
      return res.send("Successfully deleted")
    } catch (error) { next(error) }
  }

  async editTask(req, res, next) {
    try {
      let data = await _repo.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      return res.send(data)
    } catch (error) {
      { next(error) }
    }
  }
}