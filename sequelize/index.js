const exphbs = require('express-handlebars')
const express = require('express')
const conn = require('./db/conn')
const Users = require('./model/Users')
const Adress = require('./model/Adress')
const { raw } = require('mysql')
const { where } = require('sequelize')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

app.use(express.static('public'))


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

   try{
    const users = await Users.findAll({include: Adress, Users, raw: true, nest: true})

    res.render('listusers', {users})
   }catch(err){
    console.log(err)
   }

})


//EDITAR USUÁRIO
app.get('/users/edit-users/:id', async (req, res) => {

    const id = req.params.id;

    try{
        const user = await Users.findOne({include: Adress, where: {id : id}})
        res.render('editusers', {user : user.get({plain:true})})
    }catch(err){
        console.log(err)
    }
})

app.post('/users/update', async (req, res) => {
    
    const id = req.body.id;
    const name = req.body.name;
    const age = req.body.age;
    const occupation = req.body.occupation;

    const user = {
    id,
    name,
    age,
    occupation
    }   

    await Users.update(user, {where: {id : id}})

    res.redirect('/users/list-users')


})

//EXCLUIR USUÁRIO
app.post('/users/delete-user/:id', async (req, res) => {

    const id = req.params.id

    await Users.destroy({where: {id : id}})

    res.redirect('/users/list-users')

})


// EXCLUIR DADOS RELACIONADOS
app.post('/users/delete-user/:id', async (req, res) => {

    const id = req.params.id

    await Users.destroy({where: {id : id}})

    res.redirect('/users/list-users')

})




//ADICIONAR ADDRESS
app.post('/address/create', async (req, res) => {

    const UserId = req.body.UserId;
    const  street = req.body.street;
    const number = req.body.number;
    const city = req.body.city

    const adress = {
        UserId, 
        street,
        number,
        city
    }

    await Adress.create(adress)

    res.redirect('/users/list-users')

})

app.get('/', (req, res) => {

    res.render('home')

})

conn.
// sync({force: true}).
sync().
then(() => {
    app.listen(3000)
}).catch((err) => {
    console.log(err)
})