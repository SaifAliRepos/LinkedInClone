const express = require('express')
const router = express.Router()

const multer  = require('multer')
var fs = require('fs');
var path = require('path');

const Article = require('../models/article')
const Comment = require('../models/comment');
const { postArticle, showArticle, updateArticle, updateLikes, deleteArticle } = require('../controllers/article');

const _dir = '/Users/dev/mern/nodeBlog'

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
  }
});

var upload = multer({ storage: storage });

//New Article
router.get('/new', (req, res) => {
  res.render('articles/new', { article: new Article() })
})

//Show Article
router.get('/:slug', showArticle)

//Post Articles
router.post('/new', postArticle)

router.put('/:slug', updateLikes)

//don't use callbacks in mongooose i.e. passing third argument in findAndUpdate function
//update Articles
router.put('/edit/:slug', updateArticle)

//Delete Articles
router.delete('/:id', deleteArticle)


module.exports = router;
