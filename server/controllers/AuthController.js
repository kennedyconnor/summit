import express from 'express'
import UserService from '../services/UserService'
import { Authorize } from '../middleware/authorize'

let _repo = new UserService().repository
