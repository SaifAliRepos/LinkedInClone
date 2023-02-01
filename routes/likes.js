const express = require('express')
const router = express.Router()

const Like = require('../models/like')

router.post('/:id', async (req, res) => {
  let like = new Like({
    article_id: req.params.id,
    liked: 'Liked by X'
  })
  try {
    let liked = await like.save()
    res.redirect('/')
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

module.exports = router;




