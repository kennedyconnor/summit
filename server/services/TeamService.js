import mongoose from 'mongoose'
import UserService from './UserService'

let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let _schema = new mongoose.schema({
  user: [{ type: ObjectId, ref: "user" }]
})

export default class TeamService {
  get repository() {
    return mongoose.model('Team', _schema)
  }
}