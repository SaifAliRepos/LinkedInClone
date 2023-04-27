const mongoose = require('mongoose')
const User = require('../models/user')

const articleSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    title: {
      type: String
    },
    description: {
      type: String
    },
    img: {
      type: String
    },
    avatar: {
      type: String
    },
    date: {
      type: Date,
      default: () => Date.now()
    },
    like: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    }],
    comments: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      text: {
        type: String
      }
    }]

  }
)

module.exports = mongoose.model('Article', articleSchema)
