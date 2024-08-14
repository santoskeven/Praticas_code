const express = require('express')
const router = express.Router()
const path = require('path')
const pool = require('../db/db')

const app = express()

app.use(
    express.urlencoded({
        extended: true,
    })
)
app.use(express.json())

const filePath = path.join(__dirname, 'views')


//ROTAS PARA LISTAR USUÁRIOS
router.get('/list', (req, res) => {

    const query = "SELECT * FROM users"

    pool.query(query, (err, data) => {

        if(err){console.log(err)}

         const users = data

         console.log(users)

         res.render('userList', {users})

    })

})

//ROTA PARA CADASTRAR NOVO USUÁRIO
 router.get('/novo-usuario', (req, res) => {

    res.render('newuser')

 })


//ROTA POST PARA ENVIAR OS DADOS DO FORMULÁRIO PARA CADASTRO DE UM NOVO USUÁRIO NO BANCO DE DADOS
router.post('/add-user', (req, res) => {

    const nome = req.body.nome;
    const email  = req.body.email;
    const idade = req.body.idade;

    const query = "INSERT INTO users (??, ??, ??) VALUES (?, ?, ?)"
    const data = ['nome', 'email', 'idade', nome, email, idade]

    pool.query(query, data, (err) => {
        
        if(err){console.log(err)}

        res.redirect('/users/list')

    })

})

router.post('/update/:id', (req, res) => {



})

router.post('/delete/:id', (req, res) => {



})

router.get('/users', (req, res) => {



})




module.exports = router