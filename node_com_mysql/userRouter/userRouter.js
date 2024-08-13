const express = require('express')
const router = express.Router()
const path = require('path')

const filePath = path.join(__dirname, 'views')

router.get('/list', (req, res) => {

    res.render('userList')

})

router.post('/add-user', (req, res) => {



})

router.post('/update/:id', (req, res) => {



})

router.post('/delete/:id', (req, res) => {



})

router.get('/users', (req, res) => {



})




module.exports = router