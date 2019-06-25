import express from 'express'
import UserTaskService from '../services/UserTaskService'

let _service = new UserTaskService()
let _repo = _service.repository

export default class UserTaskController {
  constructor() {
    this.router = express.Router()
      .get('', this.getAllUserTasks)
      .get('/:id', this.getUserTaskById)
      //get usertask by date? this would populate on the main page
      .get('/users/:id', this.getUserTaskByUserId)
      .post('', this.createUserTask)
      .put('/:id', this.editUserTask)
      .delete('/:id', this.deleteUserTask)
      .use(this.defaultRoute)
  }
  defaultRoute(req, res, next) {
    next({ status: 404, message: 'No such route' })
  }

  async getAllUserTasks(req, res, next) {
    try {
      let data = await _repo.find({})
      return res.send(data)
    } catch (error) { next(error) }
  }

  async getUserTaskById(req, res, next) {
    try {
      let data = await _repo.find({ _id: req.params.id })
      return res.send(data)
    } catch (error) { next(error) }
  }

  async getUserTaskByUserId(req, res, next) {
    try {
      let data = await _repo.find({ userId: req.params.id, accounted: false })
        .populate('userId')
        .populate('taskId')
      return res.send(data)
    } catch (error) { next(error) }
  }

  async createUserTask(req, res, next) {
    try {
      let data = await _repo.create(req.body)
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }

  async editUserTask(req, res, next) {
    try {
      let goal = await _repo.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      return res.send(goal)
    } catch (error) { next(error) }
  }

  async deleteUserTask(req, res, next) {
    try {
      await _repo.findOneAndRemove({ _id: req.params.id })
      return res.send("Successfully deleted")
    } catch (error) { next(error) }
  }

}