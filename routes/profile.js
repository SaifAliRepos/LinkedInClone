const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const Profile = require('../models/profile')
const User = require('../models/user')
const { body, validationResult, check } = require('express-validator');
const profile = require('../models/profile')
const { getCurrentUserProfile, postProfile, getProfileByUserID,
  getAllProfiles,
  deleteProfile,
  postExperience,
  deleteExperience,
  postEducation,
  deleteEducation } = require('../controllers/profile')


// @route    GET /profile/me
// @desc     Get current users profile
// @access   Private


router.get('/me',
  auth,
  getCurrentUserProfile);

// @route    GET /profile/new
// @desc     Add new profile
// @access   Private

router.post('/new', auth,
  body('company').exists().withMessage('Company is required'),
  body('website').isURL({ require_tld: false }).withMessage('Website link should be URL'),
  check('status').isBoolean().withMessage('Status should be Boolean'),
  check('skills').not().isEmpty().withMessage('Skills are required'),
  postProfile
)

// @route    GET /profile/user/:user_id
// @desc     Get profile by user_id
// @access   Public

router.get('/user/:user_id',
  getProfileByUserID)

// @route    GET /profile/all
// @desc     Get all profiles
// @access   Public

router.get('/all',
  getAllProfiles)

// @route    Delete /profile/
// @desc     Delete a profile
// @access   Private

router.delete('/',
  auth,
  deleteProfile)

// @route    Add /profile/experience/new
// @desc     Adding experience on profile
// @access   Private

router.put('/experience/new', auth,
  [body('title').exists().withMessage("Title is required"),
  body('company').exists().withMessage("Company is required"),
  body('from').exists().withMessage("Starting date is required")],
  postExperience
)

// @route    Delete /profile/experience/:expr_id
// @desc     Delete experience on profile
// @access   Private

router.delete('/experience/:exper_id',
  auth,
  deleteExperience
)

// @route    Post /profile/education/new
// @desc     Adding education on profile
// @access   Private

router.put('/education/new', auth,
  [body('name').exists().withMessage("Name is required"),
  body('location').exists().withMessage("Location is required"),
  body('from').exists().withMessage("Starting date is required")],
  postEducation
)

// @route    Delete /profile/education/:expr_id
// @desc     Delete education on profile
// @access   Private

router.delete('/education/:edu_id',
  auth,
  deleteEducation)


module.exports = router;
