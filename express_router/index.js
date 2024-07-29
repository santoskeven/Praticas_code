const express = require('express')
const app = express()
const port = 3000;
const path = require('path');
const userRouter = require('./users');

const PathName = path.join(__dirname, 'templates')

app.use('/users', userRouter)

app.get('/', (req, res) => {

    res.sendFile(`${PathName}/index.html`)

})

app.use((req, res, next) => {

    res.status(404).sendFile(`${PathName}/404.html`)

})

app.listen(port, () =>{
    console.log(`conectado no servidor na porta ${port}`)
})

