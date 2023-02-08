var mongoose = require('mongoose');
const { db } = require('../models/article');
const config = require('config')
const dbURL = config.get('mongoURL')
mongoose.set('strictQuery', false);


const connectDB = async () => {
  try {
    await mongoose.connect(dbURL)
    console.log('MongoD is now runnning...')
  } catch (error) {
    process.exit(1)
  }
}

module.exports = connectDB;
