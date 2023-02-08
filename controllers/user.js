const gravatar = require('gravatar')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { body, validationResult } = require('express-validator');

const postUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  };

  const { name, email, password } = req.body;

  try {
    //see if user exists
    let user = await User.findOne({ email })
    if (user) {
      res.status(400).json({ errors: [{ msg: "User already exists.." }] })
    }

    //get user gravatar
    let avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm'
    })

    user = new User({
      name,
      email,
      password,
      avatar
    });

    //encrypt password
    let salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)
    console.log(user.password)
    await user.save()

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
}

const getAllUsers = async (req, res) => {
  try {

    let users = await User.find({})
    if (!users) {
      res.json({ Message: "No user found!" })
    }

    res.json({ users })
  } catch (error) {
    res.status(500).json("Server error")
  }
}

const deleteUser = async (req, res) => {

  try {
    await Profile.findOneAndDelete({ user: req.user.id })

    await User.findByIdAndDelete({ _id: req.user.id })

    res.json({ Message: "User and it's profile has beenn deleted" })

  } catch (error) {
    res.json(error)
  }

}

module.exports = { postUser, getAllUsers, deleteUser };
