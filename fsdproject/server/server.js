import http from 'http';
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { "content-type": "text/csv" })
        res.end("Home Page")
    }
    else if (req.url === "/data" && req.method == "POST") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        })
        req.on("end", () => {
            res.writeHead(200, { "content-type": "application/json" })
            const pdata = JSON.parse(body);
            res.end(JSON.stringify(pdata));
        })

    }
    else {
        res.end('Error: URL Not Found')
    }
})
server.listen(3001, () => {
    console.log("Server is running on port 3001");
})