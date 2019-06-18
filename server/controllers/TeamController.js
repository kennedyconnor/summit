import express from 'express'
import TeamService from '../services/TeamService'
import { Authorize } from '../middleware/authorize'

let _service = new TeamService()
let _repo = _service.repository

export default class TeamController {
  constructor() {
    this.router = express.Router()
      .use(Authorize.authenticated)
      .get('', this.getAllTeams)
      .get('/:id/user', this.getTeamMembers)
      .post('', this.createTeam)
      .put('/:id/user/:id', this.addMember) //double check this
      .delete('/:id', this.deleteTeam)
      .delete('/:id/user/:id', this.leaveTeam) //double check this
      .use(this.defaultRoute)
  }

  defaultRoute(req, res, next) {
    next({ status: 404, message: 'No such route' })
  }

  async getAllTeams(req, res, next) {
    try {
      let data = await _repo.find({})
      return res.send(data)
    } catch (error) { next(error) }
  }

  async getTeamMembers(req, res, next) {
    try {
      let data = await _repo.find({ _id: req.params.id, userId: req.session.uid })
      return res.send(data)
    } catch (error) { next(error) }
  }

  async createTeam(req, res, next) {
    try {
      req.body.userId = req.session.uid
      let team = await _repo.create(req.body)
      return res.status(201).send(team)
    } catch (error) { next(error) }
  }

  async addMember(req, res, next) {
    try {
      let team = await _repo.findOneAndUpdate(req.params.id, req.body).populate('team')
      return res.send(team)
    } catch (error) { next(error) }
  }

  async deleteTeam(req, res, next) {
    try {
      await _repo.findOneAndRemove({ _id: req.params.id, userId: req.session.uid })
      return res.send("Successfully deleted")
    } catch (error) { next(error) }
  }

  async leaveTeam(req, res, next) {
    try {
      await _repo.findOneAndRemove({ _id: req.params.id, userId: req.session.uid })
      return res.send("Successfully deleted")
    } catch (error) { next(error) }
  }

}
