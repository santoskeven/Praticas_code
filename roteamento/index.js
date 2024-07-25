const fs = require('fs');
const http = require('http');
const url = require('url');

const port = 3000;

const server = http.createServer((req, res) => {
    const AssUrl = url.parse(req.url, true);
    const FileName = AssUrl.pathname.substring(1)

    if(FileName.includes('html')){
        if(fs.existsSync(FileName)){
            fs.readFile(FileName, (err, data) => {
                res.writeHead(200, {'content-Type': 'text/html'})
                res.write(data)
                return res.end()
            })
        }else{
            fs.readFile('404.html', (err, data) => {
                res.writeHead(200, {'content-Type': 'text/html'})
                res.write(data)
                return res.end()
            })
        }
    }else{
        fs.readFile('ext.html', (err, data) => {
            res.writeHead(200, {'content-Type': 'text/html'})
            res.write(data)
            return res.end()
        })
    }

})

server.listen(port, (err) => {
    if(err){console.log(err)}
    console.log(`servidor rodando na porta ${port}`)
})