const gravatar = require('gravatar')
const User = require('../models/user')
const Profile = require('../models/profile')
const Article = require('../models/article')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { body, validationResult } = require('express-validator');
const article = require('../models/article')
const user = require('../models/user')
const { connections } = require('mongoose')

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
    await user.save()

    //Initialize profile with just user name
    const profile = new Profile({ user: user.id });
    await profile.save()

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
    res.status(400).json({ error: error.message });
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
    res.status(400).json({ error: error.message });
  }
}

const deleteUser = async (req, res) => {

  try {
    await Profile.findOneAndDelete({ user: req.user.id })

    await Article.findOneAndDelete({ user: req.user.id })


    await User.findByIdAndDelete({ _id: req.user.id })

    res.json({ Message: "User and it's data has been deleted" })

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const requestConnection = async (req, res) => {
  try {

    const sentRequest = await User.findOne({ _id: req.user.id, sent_requests: { $elemMatch: { user: req.body.user } } });
    const receivedRequest = await User.findOne({ _id: req.user.id, received_requests: { $elemMatch: { user: req.body.user } } });

    if (sentRequest) {
      return res.status(400).json({ message: 'Request already sent' })
    }

    if (receivedRequest) {
      return res.status(400).json({ message: 'Request already received' })
    }

    const currentUser = await User.findById(req.user.id)
    const requestedUser = await User.findById(req.body.user);

    if (!currentUser || !requestedUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    currentUser.sent_requests.unshift({ user: req.body.user, name: requestedUser.name, email: requestedUser.email });

    requestedUser.received_requests.unshift({ user: req.user.id, name: currentUser.name, email: currentUser.email });

    await currentUser.save();
    await requestedUser.save();

    res.status(200).json({ currentUser })

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

//move this code to middleware function
const updateCancelRequests = async (req, res) => {
  try {
    const sender = await User.findOne({ _id: req.body.user, sent_requests: { $elemMatch: { user: req.user.id } } });
    const receiver = await User.findOne({ _id: req.user.id, received_requests: { $elemMatch: { user: req.body.user } } });

    // const mySentRequests = User.findOne({ _id: req.user.id, sent_requests: { $elemMatch: { user: req.body.user } } });
    // myReceivedRequests = User.findOne({ _id: req.body.user, received_requests: { $elemMatch: { user: req.user.id } } });

    if (!sender || !receiver) {
      return res.json({ message: 'User not present in sent list' })
    }

    const sentIndex = sender.sent_requests.findIndex((request) => {
      return request.user == req.user.id;
    });

    const receivedIndex = receiver.received_requests.findIndex((request) => {
      return request.user == req.body.user;
    });

    sender.sent_requests.splice(sentIndex, 1)
    receiver.received_requests.splice(receivedIndex, 1)

    return data = { sender, receiver };

  } catch (error) {
    res.status(400).json({ error: error.message });
  }

}


const cancelRequest = async (req, res) => {
  try {

    const { sender, receiver } = await updateCancelRequests(req, res);

    await sender.save();
    await receiver.save();

    res.status(200).json({ receiver })

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const acceptRequest = async (req, res) => {
  try {

    const { sender, receiver } = await updateCancelRequests(req, res);

    sender.connections.unshift({ user: req.user.id });

    receiver.connections.unshift({ user: req.body.user });

    await sender.save();
    await receiver.save();

    res.status(200).json({ receiver })

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const getNewConnections = async (req, res) => {
  try {

    let connections = []
    let received = []
    let currentUser = await User.findById(req.user.id).select('connections.user received_requests.user')

    currentUser.connections.forEach((connection) => {
      connections.push(connection.user)
    })
    currentUser.received_requests.forEach((request) => {
      received.push(request.user)
    })

    let users = await User.find({
      _id: {
        $nin: [...connections, ...received],
        $ne: req.user.id
      }
    })

    if (!users) {
      res.json({ Message: "No user found!" })
    }

    res.json({ users })

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}




module.exports = {
  postUser, getAllUsers, deleteUser,
  requestConnection, cancelRequest, acceptRequest,
  getNewConnections
};
