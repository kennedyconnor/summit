import express from 'express'
import UserService from '../services/UserService'
import { Authorize } from '../middleware/authorize'

let _us = new UserService()
let _repo = _us.repository

export default class AuthController {
  constructor() {
    this.router = express.Router()
      .post('/register', this.register)
      .post('/login', this.login)
      .use(Authorize.authenticated)
      .get('', this.getAllUsers)
      .get('/authenticate', this.authenticate)
      .get('/:email', this.getUserByEmail)
      .put('/:id', this.editUser)
      .delete('/logout', this.logout)
      .use(this.defaultRoute)
  }

  async register(req, res, next) {
    //VALIDATE PASSWORD LENGTH
    if (req.body.password.length < 7) {
      return res.status(400).send({
        error: 'Password must be at least 7 characters'
      })
    }
    try {
      //CHANGE THE PASSWORD TO A HASHED PASSWORD
      req.body.hash = _us.generateHash(req.body.password)

      //CREATE THE USER
      let user = await _repo.create(req.body)
      //REMOVE THE PASSWORD BEFORE RETURNING
      delete user._doc.hash
      //SET THE SESSION UID (SHORT FOR USERID)
      req.session.uid = user._id
      res.status(201).send(user)
    }
    catch (err) {
      res.status(400).send(err)
    }
  }

  async login(req, res, next) {
    //This is the social engineering section
    try {
      let user = await _repo.findOne({ email: req.body.email })
      if (!user) {
        return res.status(400).send("Invalid Username Or Password")
      }
      //CHECK THE PASSWORD
      let valid = await user.validatePassword(req.body.password)
      if (!valid) {
        return res.status(400).send("Invalid Username Or Password")
      }
      //ALWAYS REMOVE THE PASSWORD FROM THE USER OBJECT
      delete user._doc.hash
      req.session.uid = user._id
      res.send(user)
    }
    catch (err) {
      res.status(400).send("Invalid Username Or Password")
    }
  }

  async authenticate(req, res, next) {
    try {
      let user = await _repo.findOne({ _id: req.session.uid })
      if (!user) {
        return res.status(401).send({
          error: 'Please login to continue'
        })
      }
      delete user._doc.hash
      res.send(user)
    }
    catch (err) {
      console.error(err)
      res.status(500).send(err)
    }
  }

  async getAllUsers(req, res, next) {
    try {
      let user = await _repo.find({})
      return res.send(user)
    } catch (error) {
      console.error(error)
    }
  }

  async getUserByEmail(req, res, next) {
    try {
      let user = await _repo.findOne({ email: req.params.email })
      return res.send(user)
    } catch (error) {
      console.error(error)
    }
  }

  async editUser(req, res, next) {
    try {
      let user = await _repo.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      return res.send(user)
    } catch (error) {
      console.error(error)
    }
  }

  async logout(req, res, next) {
    try {
      req.session.destroy(err => {
        if (err) {
          return res.send(err)
        }
        return res.send({
          message: 'Logout Successful'
        })
      })
    } catch (error) { next(error) }
  }

  defaultRoute(req, res, next) {
    next({ status: 404, message: 'No Such Route' })
  }
}