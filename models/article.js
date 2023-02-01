const mongoose = require('mongoose')
const { default: slugify } = require('slugify')

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String
    },
    description: {
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
    like: {
      type: Number,
      default: 0
    },
    // img: {
    //   data: Buffer,
    //   contentType: String,
    // },
  }
)

articleSchema.pre('validate', function(next){
  if(this.title){
    this.slug = slugify(this.title, {lower: true, strict: true})
  }
  next()
})



module.exports = mongoose.model('Article', articleSchema)
