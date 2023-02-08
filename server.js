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

app.use(methodOverride('_method'))
app.use('/public', express.static(__dirname + '/public'));
app.use('/uploads', express.static(__dirname + 'uploads'));
app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'ejs')

app.get('/', getAllArticles)

app.use(express.json()) //allow us to get data in body
app.use('/articles', articleRouter)
app.use('/users', userRouter)
app.use('/auth', authRouter)
app.use('/profile', profileRouter)

const PORT = process.env.PORT || 3005
app.listen(PORT, () => console.log(`Now listening to ${PORT}`))
