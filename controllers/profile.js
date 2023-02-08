const gravatar = require('gravatar')
const User = require('../models/user')
const Profile = require('../models/profile')
const { body, validationResult } = require('express-validator');

const getCurrentUserProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'email']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}


const postProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  };

  const { company, website, location,
    bio, status, githubusername,
    skills, youtube, facebook,
    twitter, instagram, linkedin
  } = req.body

  //build profile params
  const profileParams = {};
  profileParams.user = req.user.id;
  if (company) profileParams.company = company;
  if (website) profileParams.website = website;
  if (location) profileParams.location = location;
  if (bio) profileParams.bio = bio;
  if (status) profileParams.status = status;
  if (githubusername) profileParams.githubusername = githubusername;
  if (skills) {
    profileParams.skills = skills.split(',')
  };

  //init social as it's uninitialized

  profileParams.social = {};

  if (youtube) profileParams.social.youtube = youtube;
  if (instagram) profileParams.social.instagram = instagram;
  if (linkedin) profileParams.social.linkedin = linkedin;
  if (facebook) profileParams.social.facebook = facebook;

  try {
    let profile = await Profile.findOne({ user: req.user.id })

    if (profile) {
      profile = await Profile.findOneAndUpdate({ user: req.user.id },
        { $set: profileParams },
        { new: true })

      return res.json(profile)
    }

    profile = new Profile(profileParams);
    await profile.save()
    res.send(profile)

  } catch (error) {

  }
}

const getProfileByUserID = async (req, res) => {
  try {

    const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'email'])
    if (!profile) {
      return res.status(400).json({ Message: "User doesn't exists" })
    }

    res.json({ profile })

  } catch (error) {
    if (error.kind == 'ObjectId') {
      return res.status(400).json({ Message: "User doesn't exists" })
    }
    res.json(error)
  }
}

const getAllProfiles = async (req, res) => {

  try {

    let profiles = await Profile.find({}).populate('user', ['name', 'email']);

    if (!profiles) {
      res.json({ Message: "No profiles available" })
    }
    res.json({ profiles })

  } catch (error) {
    res.json(error)
  }
}

const deleteProfile = async (req, res) => {

  try {

    await Profile.findOneAndDelete({ user: req.user.id }).populate('user', ['email', 'name'])

    res.json({ Message: "Profile has beenn deleted" })

  } catch (error) {
    res.json(error)
  }

}

const postExperience = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  };

  const { title, company,
    from, to, description,
    current } = req.body;


  const newExperience = {
    title, company,
    from, to, description,
    current
  }

  try {

    let profile = await Profile.findOne({ user: req.user.id })

    if (!profile) {
      res.json("Profile not found")
    }

    profile.experience.unshift(newExperience)
    await profile.save()

    res.json({ profile })

  } catch (error) {
    res.json(error)
  }
}

const deleteExperience = async (req, res) => {

  try {

    let profile = await Profile.findOne({ user: req.user.id })

    if (!profile) {
      res.json("Profile doesnt exists")
    }

    const index = profile.experience.findIndex(i => { return i.id == req.params.exper_id })

    profile.experience.splice(index, 1)

    await profile.save()

    res.json(profile)

  } catch (error) {
    res.json(error)
  }
}

const postEducation = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  };

  const { name, location,
    from, to, current } = req.body;

  const newEducation = {
    name, location, from, to, current
  }

  try {

    let profile = await Profile.findOne({ user: req.user.id })

    if (!profile) {
      res.json("Profile not found")
    }

    profile.education.unshift(newEducation)
    await profile.save()

    res.json({ profile })

  } catch (error) {
    res.json(error)
  }

}

const deleteEducation = async (req, res) => {

  try {

    let profile = await Profile.findOne({ user: req.user.id })

    if (!profile) {
      return res.status(400).json({ Message: "No profile agianst this user" })
    }

    const index = profile.education.findIndex(i => { return i.id == req.params.exper_id })

    profile.education.splice(index, 1)

    await profile.save()

    res.json(profile)

  } catch (error) {
    res.json(error)
  }

}


module.exports = {
  getCurrentUserProfile, postProfile, getProfileByUserID,
  getAllProfiles, deleteProfile, postExperience, deleteExperience,
  postEducation, deleteEducation
}

