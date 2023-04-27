const Article = require('../models/article')
const multer = require('multer')
const Profile = require('../models/profile')
const User = require('../models/user')
const { validationResult } = require('express-validator')
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: "saifalidevsinc",
  api_key: "494812471993478",
  api_secret: "6xyOI3GA9c65gH36jiua0L8nK64"
});



const uploadImage = async (imagePath) => {

  // const options = { use_filename: true, unique_filename: true, overwrite: false };

  try {
    const result = await cloudinary.uploader.upload(imagePath);
    return `${result.secure_url}-${result.public_id}`;
  } catch (error) {
    console.error(error);
  }
};

const getAllArticles = (req, res) => {
  try {
    let articles = Article.find({}, (err, data) => {
      if (err) throw err
      res.send({ articles: data })
    }).populate('user', ['name', 'email']).sort({ date: 'desc' })

  } catch (error) {
    return res.status(500).json(error.message)
  }
}

const getConnectedArticles = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('connections.user') // userConnections should be array
    const connectionIds = user.connections.map(connection => connection.user)
    connectionIds.push(req.user.id);
    const articles = await Article.find({ user: { $in: connectionIds } })
      .populate('user', ['name', 'email'])
      .sort({ date: 'desc' })

    if (!articles) {
      return res.json('Articles not found..')
    }

    return res.json({ articles })

  } catch (error) {
    return res.status(500).json(error.message)
  }
}

const showArticle = async (req, res) => {
  try {
    let article = await Article.findById(req.params.id)

    if (!article) {
      return res.status(404).json('Article not found')
    }

    return res.status(200).json(article)

  } catch (error) {
    return res.status(500).json(error.message)
  }
}

const showUsersArticle = async (req, res) => {
  try {
    let articles = await Article.find({ user: req.params.user_id })
      .populate('user', 'name email')
      .sort({ date: 'desc' })

    if (!articles) {
      return res.json('Articles not found..')
    }

    return res.json({ articles })

  } catch (error) {
    return res.status(500).json(error.message)
  }
}

const postArticle = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  };

  const { title, description } = req.body
  const user = req.user.id

  const img = await uploadImage(req.body.img);
  console.log(img);

  let article = new Article({ title, description, img, user })
  try {
    article = await article.save()
    return res.status(200).json(article)
  } catch (error) {
    return res.status(500).json(error.message)
  }
}

const updateArticle = async (req, res) => {
  try {

    let article = await Article.findByIdAndUpdate(req.params.id,
      { $set: req.body },
      { new: true });

    if (!article) {
      return res.status(404).json('Article not found')
    }

    return res.status(200).json(article)

  } catch (error) {
    return res.status(500).json(error.message);
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

    res.status(200).json(article)
  } catch (error) {
    res.status(500).json(error.message)
  }
}

const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id)
    if (!article) {
      return res.status(404).json('Article not found')
    }
    if (article.img) {
      await cloudinary.uploader.destroy(article.img.split('-')[1]);
    }

    return res.status(200).json(`Article with id: ${req.params.id} deleted`)
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

const deleteComments = async (req, res) => {

  try {

    let article = await Article.findById(req.params.article_id)

    if (!article) {
      res.json("Article not founf!")
    }

    const index = article.comments.findIndex((comment) => {
      return comment.id == req.params.comment_id;
    });

    article.comments.splice(index, 1)

    await article.save()

    return res.status(200).json(article)

  } catch (error) {
    return res.status(500).json(error.message)
  }
}

const postComments = async (req, res) => {

  try {

    let user = await User.findById(req.user.id).select('-password')
    let article = await Article.findById(req.params.article_id)

    if (!user || !article) {
      return res.status(404).json("Article or profile doesn't exists")
    }

    const newComment = {
      text: req.body.text,
      user: user.id
    }

    article.comments.unshift(newComment)

    await article.save()

    return res.status(200).json(article)

  } catch (error) {
    return res.status(500).json(error.message)
  }
}


module.exports = {
  deleteComments, postComments, deleteArticle,
  updateLikes, updateArticle, postArticle, showArticle,
  getAllArticles, uploadImage, getConnectedArticles, showUsersArticle
}
