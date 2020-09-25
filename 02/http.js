const http = require('http');

const server = http.createServer((req, res) => {

    console.log('METHOD', req.method);

    console.log('URL', req.url);

    console.log('HEADERS', req.headers);

    let body = '';

    req.on('data', chunk => {
        console.log(chunk);
        body += chunk.toString();
    });

    req.on('end', () => {
        console.log(req);
    });

    res.writeHead(201, {
        'Content-Type': 'text/plain'
    })

    res.end('Hello');
});

server.listen(3001, () => console.log('Server was started.'));