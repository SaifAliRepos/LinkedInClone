const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const router = express.Router()
const { body, validationResult, check } = require('express-validator');

// @route GET /auth
// @desc Test route
// @access Public

router.get('/', auth, async (req, res) => {
  try {

    const user = await User.findById(req.user.id).select('-password')
    res.json({ user })

  } catch (error) {
    res.json({ Error: error.msg })
  }
})

router.post('/', async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  };

  const { email, password } = req.body;

  try {
    //see if user exists
    let user = await User.findOne({ email })
    if (!user) {
      res.status(400).json({ errors: [{ msg: "User not found.." }] })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.json('Invalid credentials')
    }

    //return jsonwebtoken
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(payload,
      config.get('jsonSecret'),
      { expiresIn: 3600000 },
      (err, token) => {
        if (err) throw err
        res.status(200).json({ token })
      })

  } catch (error) {
    console.log('Server error: ', error)
  }
})


module.exports = router;
