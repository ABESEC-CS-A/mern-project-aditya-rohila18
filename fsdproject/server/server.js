import http from 'http';
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { "content-type": "text/csv" })
        res, write("Home Page")
    }
    else if (req.url === '/data' && req.method === 'POST') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => {
            const pdata = JSON.parse(body);
            res.write(body);
        });
        res.write("About Page")
    }
    else {
        res.write("Error: URL Not Found")
    }
    res.end();
})
server.listen(3001, () => {
    console.log("Server is running on port 3001");
})

