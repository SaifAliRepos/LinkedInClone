const mongooose = require('mongoose')

const userSchema = new mongooose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: () => Date.now()
  }
})

module.exports = mongooose.model('User', userSchema)
