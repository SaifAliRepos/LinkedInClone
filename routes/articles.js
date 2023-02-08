const express = require('express')
const router = express.Router()
const Profile = require('../models/profile')
const User = require('../models/user')

const multer = require('multer')
var fs = require('fs');
var path = require('path');

const Article = require('../models/article')
const { postArticle, showArticle, updateArticle, updateLikes, deleteArticle, deleteComments, postComments } = require('../controllers/article');
const auth = require('../middleware/auth');
const { body } = require('express-validator');
const { profile } = require('console');

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
router.get('/:slug',
  showArticle)

//Post Articles
router.post('/new', auth, body('title').exists().withMessage('Title is required'),
  body('description').exists().withMessage('Description is required'),
  postArticle)

router.put('/:article_id',
  auth,
  updateLikes)

//don't use callbacks in mongooose i.e. passing third argument in findAndUpdate function
//update Articles
router.put('/edit/:slug',
  updateArticle)

//Delete Articles
router.delete('/:id',
  deleteArticle)

// @route    Post /:article_id/comment/new
// @desc     Add comment on article
// @access   Private

router.post('/:article_id/comment/new',
  auth,
  postComments)

// @route    Delete /articles/:article_id/comment/:comment_id
// @desc     Add comment on article
// @access   Private

router.delete('/:article_id/comment/:comment_id',
  auth,
  deleteComments)



module.exports = router;
