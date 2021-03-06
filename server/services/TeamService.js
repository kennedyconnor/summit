import mongoose from 'mongoose'
import UserService from './UserService'

let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let _schema = new mongoose.Schema({
  name: { type: String, required: true, default: "My Team" },
  active: { type: Boolean, required: true, default: false },
  users: [{ type: ObjectId, ref: 'User' }]
})

export default class TeamService {
  get repository() {
    return mongoose.model('Team', _schema)
  }
}