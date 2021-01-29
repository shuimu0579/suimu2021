const http = require('http');
const fs = require('fs');
const unzip = require('unzipper');

const server = http.createServer((req, res) => {
    
    let writeStream = unzip.Extract({path: '../server/public/'});
    req.pipe(writeStream);
    /*req.on('data', trunk => {
        writeStream.write(trunk);
    });
    req.on('end', trunk => {
        writeStream.end(trunk);
    });*/
    req.on('end', () => {
        res.writeHead(200, {
            'content-Type': 'text/plain'
        });
        res.end('okay');
    });
});

server.listen(8081);