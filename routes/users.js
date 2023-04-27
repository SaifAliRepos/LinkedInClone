const express = require('express')
const router = express.Router()
const { postUser, getAllUsers, deleteUser, requestConnection, cancelRequest, acceptRequest, getNewConnections } = require('../controllers/user')

const { body, validationResult, check } = require('express-validator');
const auth = require('../middleware/auth')

// @route GET /user
// @desc Test route
// @access Public

router.post('/new',
  body('email').exists().withMessage("Email required").isEmail().withMessage("Invalid Email"),
  check('password').exists().withMessage("Passowrd required").isLength({ min: 5 }).withMessage('Length should be greater than five').matches(/[!@#$%^&*(),.?":{}|<>]/g).withMessage('Special character required for password'),
  postUser
)

router.get('/all', getAllUsers)

router.get('/suggested-users', auth, getNewConnections)

router.delete('/',
  auth,
  deleteUser)

router.put('/send-request',
  body('user').exists().withMessage("User required"),
  auth,
  requestConnection)

router.put('/cancel-request', auth, cancelRequest)

router.put('/accept-request', auth, acceptRequest)



module.exports = router;
