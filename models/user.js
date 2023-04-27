const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
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
  connections: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  }],
  received_requests: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  }],
  sent_requests: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  }],
  date: {
    type: Date,
    default: () => Date.now()
  }
})


module.exports = mongoose.model('User', userSchema)
