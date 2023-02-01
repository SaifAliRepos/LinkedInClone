const Article = require('../models/article')
const multer = require('multer')
const like = require('../models/like')

const getAllArticles = (req, res) => {
  let articles = Article.find({}, (err, data) => {
    if (err) throw err
    // res.render('articles/index', { articles: data })
    res.send({ articles: data })
  }).sort({ date: 'desc' })
}

const showArticle = async (req, res) => {
  let article = await Article.findOne({ slug: req.params.slug })
  if (article == null) res.redirect('/')
  // res.render('articles/show', { article: article })
  res.send({ article })
}

const postArticle = async (req, res) => {
  let article = new Article(req.body)
  try {
    article = await article.save()
    console.log(article)
    // res.redirect(`/articles/${article.id}`)
    res.send({ article })
  } catch (error) {
    // res.render('articles/new', { article: article })
    res.send(error)
  }
}

const updateArticle = async (req, res) => {
  try {
    let article = await Article.findOneAndUpdate({ slug: req.params.slug }, req.body)
    // res.redirect('/')
    res.send({ article })
  } catch (error) {
    // console.log('Error: ', error)
    // res.redirect('/')
    res.send(error)
  }
}

const updateLikes = async (req, res) => {
  try {
    await Article.findOneAndUpdate({ slug: req.params.slug }, [{
      $set: {
        like: {
          $switch: {
            branches: [
              { case: { $eq: ["$like", 1] }, then: { $sum: ["$like", -1] } },
              { case: { $eq: ["$like", 0] }, then: { $sum: ["$like", 1] } }
            ]
          }
        }
      }
    }])

    res.send(like)
  } catch (error) {
    res.send(error)
  }
}

const deleteArticle = async (req, res) => {
  await Article.findByIdAndDelete(req.params.id)
  // res.redirect('/')
  res.send(`Article with id: ${req.params.id} deleted`)
}



module.exports.getAllArticles = getAllArticles;
module.exports.showArticle = showArticle;
module.exports.postArticle = postArticle;
module.exports.updateArticle = updateArticle;
module.exports.updateLikes = updateLikes;
module.exports.deleteArticle = deleteArticle;





// let noOfCommentsOnArticle = Comment.countDocuments({}, (err, data) => { data })
// let likes = await Like.find({}, (err, data) => data ).clone()
// console.log(likes)

// {
//   $inc: {
//     like: {
//       $cond: {
//         if: { $gte: 1 },
//         then: 5,
//         else: 6
//       }
//     }
//   }
// }


// // {
// //   $cond: {
// //     if: { $gte: { "$like": 1 } },
// //     then: { $inc: { "$like": 1 } },
// //     else: { $inc: { "$like": 5 } }
// //   }
// // }
