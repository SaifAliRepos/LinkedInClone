const Article = require('../models/article')
const multer = require('multer')
const Profile = require('../models/profile')
const User = require('../models/user')
const { validationResult } = require('express-validator')

const getAllArticles = (req, res) => {
  let articles = Article.find({}, (err, data) => {
    if (err) throw err
    // res.render('articles/index', { articles: data })
    res.send({ articles: data })
  }).populate('user', ['name', 'email']).sort({ date: 'desc' })
}

const showArticle = async (req, res) => {
  let article = await Article.findOne({ slug: req.params.slug })
  if (article == null) res.redirect('/')
  // res.render('articles/show', { article: article })
  res.send({ article })
}

const postArticle = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  };

  const { title, description
  } = req.body
  const user = req.user.id

  let article = new Article({ title, description, user })
  try {
    article = await article.save()
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

    let article = await Article.findById(req.params.article_id)

    const addLike = {
      user: req.user.id
    }

    const index = article.like.findIndex(i => {
      return (i.user.toString() == req.user.id)
    })

    if (index < 0) {
      article.like.unshift(addLike)
    } else {
      article.like.splice(index, 1)
    }

    await article.save()

    res.send(article)
  } catch (error) {
    res.send(error)
  }
}

const deleteArticle = async (req, res) => {
  await Article.findByIdAndDelete(req.params.id)
  // res.redirect('/')
  res.send(`Article with id: ${req.params.id} deleted`)
}

const deleteComments = async (req, res) => {

  try {

    let article = await Article.findById(req.params.article_id)

    if (!article) {
      res.json("Article not founf!")
    }

    const index = article.comments.findIndex((i) => {
      if (i.id !== req.params.comment_id) {
        throw ("No match found")
      }
      return i.id == req.params.comment_id
    })

    article.comments.splice(index, 1)

    await article.save()

    res.json(article)

  } catch (error) {
    res.status(500).json(error)
  }
}

const postComments = async (req, res) => {

  try {

    let user = await User.findById(req.user.id).select('-password')
    let article = await Article.findById(req.params.article_id)

    const newComment = {
      text: req.body.text,
      user: user.id
    }
    if (!article) {
      res.status(400).json("Profile doesn't exists")
    }

    article.comments.unshift(newComment)

    await article.save()

    res.json(article)

  } catch (error) {
    res.status(500).json(error)
  }
}


module.exports = { deleteComments, postComments, deleteArticle, updateLikes, updateArticle, postArticle, showArticle, getAllArticles }
