const mongoose = require('mongoose')
const { default: slugify } = require('slugify')
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
    avatar: {
      type: String
    },
    date: {
      type: Date,
      default: () => Date.now()
    },
    slug: {
      type: String,
      required: true,
      unique: true
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

articleSchema.pre('validate', function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true })
  }
  next()
})



module.exports = mongoose.model('Article', articleSchema)
