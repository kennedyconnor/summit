import mongoose from 'mongoose'

const connectionString = "mongodb://student:student123@cluster0-shard-00-00-07ffa.mongodb.net:27017,cluster0-shard-00-01-07ffa.mongodb.net:27017,cluster0-shard-00-02-07ffa.mongodb.net:27017/summit?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"

let connection = mongoose.connection

mongoose.connect(connectionString)

connection.on('error', err => {
  console.error('[DATABASE ERROR]:', err)
})

connection.once("open", () => {
  console.log('Connected to the Database')
})