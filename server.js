const express = require('express')
const mongoose = require('mongoose')
const articleRouter = require('./routes/articles')
const Article = require('./models/article')
const methodOverride = require('method-override')
const PORT = 3000
const HOST = '0.0.0.0'
const app = express()
const os = require('os')

mongoose.connect('mongodb://0.0.0.0:8080/pi')

app.set('view engine', 'ejs')
app.use('/public', express.static('public'));

app.use(express.urlencoded({ extended: false }))

app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({
        createdAt: 'desc'
    })
    res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(PORT, HOST, () => {
    console.info(`Running on Container: Container ID:${os.hostname}`)
})

