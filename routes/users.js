const express = require('express')
const router = express.Router()
const { postUser, getAllUsers, deleteUser } = require('../controllers/user')
const gravatar = require('gravatar')
const User = require('../models/user')
const { body, validationResult, check } = require('express-validator');
const { genSalt } = require('bcryptjs');
const { exists } = require('../models/article')
const Profile = require('../models/profile')
const auth = require('../middleware/auth')

// @route GET /user
// @desc Test route
// @access Public

router.post('/new',
  body('email').exists().withMessage("Email required").isEmail().withMessage("Invalid Email"),
  check('password').exists().withMessage("Passowrd required").isLength({ min: 5 }).withMessage('Length should be greater than five').matches(/[!@#$%^&*(),.?":{}|<>]/g).withMessage('Special character required'),
  postUser
)

router.get('/all', getAllUsers)

router.delete('/',
  auth,
  deleteUser)


module.exports = router;
