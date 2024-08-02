const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const port = 3000;

const hbs = exphbs.create({
    partialsDir: ['views/partials']
})

const app = express()

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(
    express.urlencoded({
        extended: true
    })
);
app.use(
    express.json()
)

app.get('/post', (req, res) => {

    const post = [
        {
            title: 'APRENDER NODEJS1',
            category: 'JavaScript',
            body: 'aprender js',
            comments: 4
        },
        {
            title: 'APRENDER NODEJS2',
            category: 'nodejs',
            body: 'aprender nodejs',
            comments: 4
        },
        {
            title: 'APRENDER NODEJS3',
            category: 'php',
            body: 'aprender php',
            comments: 4
        },
        {
            title: 'APRENDER NODEJS4',
            category: 'express',
            body: 'aprender express',
            comments: 4
        }
    ]

    res.render('blog', {post})

})

app.post('/form/save', (req, res) => {

    const name = req.body.name
    const age = req.body.age

    console.log(`meu nome é ${name} e minha idade é ${age}`)

    res.render('form')

})

app.get('/form', (req, res) => {

    res.render('form')

})

app.get('/', (req, res) => {

    res.render('home')

})

app.listen(port, () => {

    console.log('servidor conectado na porta 3000')

})