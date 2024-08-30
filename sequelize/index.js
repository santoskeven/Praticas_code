const exphbs = require('express-handlebars')
const express = require('express')
const conn = require('./db/conn')
const Users = require('./model/Users')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())


app.get('/users/add-user', (req, res) => {

    res.render('addusers')
    
})

app.post('/users/add-users', (req, res) => {

    const name = req.body.name;
    const age = req.body.age;
    const occupation = req.body.occupation;

    const users = {
        name,
        age,
        occupation
    }

   try{
        Users.create(users)   
        res.redirect('/')
   }catch(err){
        console.log(err)
   }

})

app.get('/users/list-users', async (req, res) => {

    const users = await Users.findAll({Users, raw: true})

    res.render('listusers', {users})

})

app.get('/', (req, res) => {

    res.render('home')

})

conn.
sync().
then(() => {
    app.listen(3000)
}).catch((err) => {
    console.log(err)
})