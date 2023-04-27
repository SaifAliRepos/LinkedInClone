const express = require('express')

const userRouter = require('./routes/users')
const articleRouter = require('./routes/articles')
const authRouter = require('./routes/auth')
const profileRouter = require('./routes/profile')

const { getAllArticles } = require('./controllers/article')

const connectDB = require('./config/db')
const methodOverride = require('method-override')

const app = express()
var bodyParser = require('body-parser')

connectDB();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, x-auth-token, Content-Type, Accept");
  next();
});

app.use(methodOverride('_method'))
app.use('/public', express.static(__dirname + '/public'));
app.use('/uploads', express.static(__dirname + 'uploads'));
app.use(express.json({ limit: "5mb", extended: true }))
app.use(express.urlencoded({ limit: "5mb", extended: true, parameterLimit: 50000 }))

app.set('view engine', 'ejs')

app.use(express.json()) //allow us to get data in body
app.use('/articles', articleRouter)
app.use('/users', userRouter)
app.use('/auth', authRouter)
app.use('/profile', profileRouter)

const PORT = process.env.PORT || 3005
app.listen(PORT, () => console.log(`Now listening to ${PORT}`))
