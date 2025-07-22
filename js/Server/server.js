const http = require('http');
const fs = require("fs");
const path = require('path');



const port = 3000;

const server = http.createServer((req , res) =>{
    const filePath = path.join(__dirname , req.url === '/' ? "index.html" : req.url);

    const extName = String(path.extname(filePath)).toLowerCase();

    const mimeType = {
        ".html": "text/html",
        ".js": "text/javascript",
        ".css": "text/css",
        ".json": "application/json",
        ".png": "image/png",
        ".jpg": "image/jpg",
        ".gif": "image/gif",
        ".svg": "image/svg+xml",
        ".wav": "audio/wav"
    };

    const contentType = mimeType[extName] || 'application/octet-stream';

    fs.readFile(filePath, (err, content)=> {
        if(err){
            if(err.code == 'ENOENT'){
                res.writeHead(404, {'content-type': 'text/html'});
                res.end('404: File Not Found');
            }
        }else{
            res.writeHead(200, {'content-type': contentType});
            res.end(content, 'utf-8');
        }
    })
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})