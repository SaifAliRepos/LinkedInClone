const express = require('express')

const articleRouter = require('./routes/articles')
const commentRouter = require('./routes/comments')
const { getAllArticles } = require('./controllers/article')
const Comment = require('./models/comment')
const Like = require('./models/like')
// var mongoose = require('mongoose')
const connectDB = require('./config/db')
const methodOverride = require('method-override')
const like = require('./models/like')
const app = express()
var bodyParser = require('body-parser')

// mongoose.set('strictQuery', false);
// mongoose.connect('mongodb+srv://admin:admin@cluster0.oi2owbd.mongodb.net/?retryWrites=true&w=majority')

app.use(methodOverride('_method'))
app.use('/public', express.static(__dirname + '/public'));
app.use('/uploads', express.static(__dirname + 'uploads'));
app.use(express.urlencoded({ extended: false }))

// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

app.set('view engine', 'ejs')


app.get('/', getAllArticles)

app.use(express.json())
app.use('/articles', articleRouter)
app.use('/articles', commentRouter)

app.listen(3005)
