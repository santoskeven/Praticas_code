const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const porta = 3000;


app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')    
const UsersRouter = require('./userRouter/userRouter')

app.use(
    express.urlencoded({
        extended: true,
    })
)
app.use(express.json())

app.use(express.static('public'))
app.use('/users', UsersRouter)

app.get('/', (req, res) => {

    res.render('home')

})


app.listen(porta, (err) => {

    if(err){console.log(err)}

    console.log('servidor rodando')

})