const mongooose = require('mongoose')
const User = require('../models/user')

const profileSchema = new mongooose.Schema({
  user: {
    type: mongooose.Schema.Types.ObjectId,
    ref: 'User'
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  githubusername: {
    type: String
  },
  experience: [{
    title: {
      type: String
    },
    company: {
      type: String
    },
    location: {
      type: String
    },
    from: {
      type: Date
    },
    to: {
      type: Date
    },
    current: {
      type: Boolean,
      default: false
    },
    description: {
      type: String
    }
  }],
  education: [{
    name: {
      type: String,
    },
    location: {
      type: String
    },
    from: {
      type: Date
    },
    to: {
      type: Date
    },
    current: {
      type: Boolean,
      default: false
    },
  }],
  social: {
    instagram: {
      type: String
    },
    facebook: {
      type: String
    },
    youtube: {
      type: String
    },
    linkdin: {
      type: String
    }
  },
  date: {
    type: Date,
    default: () => Date.now()
  }
});

module.exports = mongooose.model('Profile', profileSchema)
