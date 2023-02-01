const express = require('express')
const comment = require('../models/comment')
const router = express.Router()

const Comment = require("../models/comment")


router.get('/:slug/comment/new', (req, res) => {
  res.render('articles/comments/new', { data: {article_slug: req.params.slug, comment: new Comment()} })
})

router.post('/:slug/comment/new', (req, res) => {
  try {
    let comment = new Comment({
      article_id: req.params.slug,
      comment: req.body.comment
    })
    comment.save()
    res.redirect('/')
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

module.exports = router;

