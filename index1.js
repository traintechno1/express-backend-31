
const http = require("http");

const server = http.createServer((req, res)=>{
    const request = req;

    if(request.method === 'GET' && request.url === "/"){
        res.writeHead(200, {'Content-Type': "text/html"});
        res.end("<h1>Hello World!<h1>");
        return;
    }
    if(request.method === 'GET' && request.url === '/users' ){
        res.writeHead(200, { 'Conent-Type': 'application/json'});
        res.end(JSON.stringify({users: [
            {
                name: "Hemant",
                mobile: 9867568962,
                email: "hemant@gmail.com"
            },
            {
                name: "Anubhav",
                mobile: 7877568962,
                email: "anubhav@gmail.com"
            }
        ]}))
    }

    res.writeHead(404);
    res.end("Not found");
})

server.listen(4000, ()=>{ 
    console.log("Server started on port 4000");
})