const express = require('express')
const connectDb = require('./config/db')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
// import router
const posts = require('./routes/posts')

// Start app
const app = express()

// start handlebars middleware
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

// Start bodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Start method override middleware
app.use(methodOverride('_method'))

// Start express middleware
app.use(express.json())

// Connect DB
connectDb()

// Some routes
app.get('/', (req, res) => res.render('index'))
app.get('/about', (req, res) => res.render('about'))

// Use router
app.use('/posts', posts)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server start in ${PORT}`))
