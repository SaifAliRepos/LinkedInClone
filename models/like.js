const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema(
  {
    aritcle_id: {
      type: String
    },
    liked: {
      type: String
    }
  }
)

module.exports = mongoose.model('Like', likeSchema)


