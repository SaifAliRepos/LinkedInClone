const mongooose = require('mongoose')

const commentSchema = new mongooose.Schema(
  {
    article_id: {
      type: String
    },
    comment: {
      type: String
    },
    date: {
      type: Date,
      default: () => Date.now()
    }
  }
)


module.exports = mongooose.model('Comment', commentSchema)
