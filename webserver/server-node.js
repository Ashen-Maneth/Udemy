const http = require('http');
const { hostname } = require('os');
const hostn = '127.0.0.1';

const port = 3000;

const server = http.createServer((req,res) => {
    if (req.url === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end("hello ice tea");
    }else if (req.url === '/ice-tea') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end("Thanks for ordering ice tea");
    }else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end("Not found");
    }
})


server.listen(port, hostname,() => {

    console.log(`server running at http://${hostname}:${port}`);   
})