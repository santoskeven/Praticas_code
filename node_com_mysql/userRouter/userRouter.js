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

router.get('/user-edit/:id', (req, res) => {

    const id = req.params.id

    const query = `SELECT * FROM users WHERE ?? = ?`
    const data = ['id', id]

    pool.query(query, data, (err, data) => {

        const users = data[0]

        res.render('editUser', {users})

    })

})

router.post('/update-user', (req, res) => {

    const id = req.body.id;
    const nome = req.body.nome;
    const email = req.body.email;
    const idade = req.body.idade;

    const query = `UPDATE users SET ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?`
    const data = ['nome', nome, 'email', email, 'idade', idade, 'id', id]

    pool.query(query, data, (err) => {
        if(err){
            console.log(err)
        }
        res.redirect('/users/list')
    })

})

router.post('/delete-user/:id', (req, res) => {

    const id = req.params.id

    const query = "DELETE FROM users WHERE ?? = ?"
    const data = ['id', id]

    pool.query(query, data, (err) => {
        if(err){console.log(err)}
        res.redirect('/users/list')
    })

})

module.exports = router