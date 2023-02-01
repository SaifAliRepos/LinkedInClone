var mongoose = require('mongoose')
const mongoURL = require('./default.json')
mongoose.set('strictQuery', false);


const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL.mongoURL)
    console.log('MongoD is now runnning...')
  } catch (error) {
    process.exit(1)
  }
}
