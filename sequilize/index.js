const exphbs = require('express-handlebars')
const express = require('express')
const conn = require('./db/conn')
const Users = require('./model/Users')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {

    res.render('home')

})

app.listen(3000, (err) => {

    if(err){console.log(err)}

})

conn.
sync().
then(() => {
    app.listen(3000)
}).catch((err) => {
    console.log(err)
})