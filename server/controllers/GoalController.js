import GoalService from "../services/GoalService"
import express from 'express'
import { Authorize } from '../middleware/authorize'

let _service = new GoalService()
let _repo = _service.repository

export default class GoalController {
  constructor() {
    this.router = express.Router()
      .use(Authorize.authenticated)
      .get('', this.getAllGoals)
      .get('/:id', this.getGoalById)
      .post('', this.createGoal)
      .put('/:id/', this.editGoal) //double check put/delete
      // .delete('/:id/task/:id', this.deleteTask)
      .delete('/:id', this.deleteGoal)
      .use(this.defaultRoute)
  }

  defaultRoute(req, res, next) {
    next({ status: 404, message: 'No such route' })
  }

  async getAllGoals(req, res, next) {
    try {
      let data = await _repo.find({})
      return res.send(data)
    } catch (error) { next(error) }
  }

  async getGoalById(req, res, next) {
    try {
      let data = await _repo.find({ _id: req.params.id })
      return res.send(data)
    } catch (error) { next(error) }
  }

  async createGoal(req, res, next) {
    try {
      let data = await _repo.create(req.body)
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }

  //double check editGoal
  async editGoal(req, res, next) {
    try {
      let goal = await _repo.findOneAndUpdate(req.params.id, req.body, { new: true })
      return res.send(goal)
    } catch (error) { next(error) }
  }

  // async deleteTask(req, res, next) {
  //   try {
  //     await _repo.findOneAndRemove({ _id: req.params.id, userId: req.session.uid })
  //     return res.send("Successfully deleted")
  //   } catch (error) { next(error) }
  // }

  async deleteGoal(req, res, next) {
    try {
      await _repo.findOneAndRemove({ _id: req.params.id })
      return res.send("Successfully deleted")
    } catch (error) { next(error) }
  }

}
