const express = require('express')
const router = express.Router()
const path = require('path')

const PathName = path.join(__dirname, '../templates')

router.use(
    express.urlencoded({
        extended: true,
    })
)
router.use(express.json())


router.get('/add', (req, res) => {

    res.sendFile(`${PathName}/form.html`)

})

router.post('/save', (req, res) => {

    const name = req.body.name
    const age = req.body.age

    console.log(`seu nome é ${name} e sua idade é ${age}`)

    res.sendFile(`${PathName}/form.html`)

})

module.exports = router