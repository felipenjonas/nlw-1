const express = require("express");
const server = express();

//Configurar pasta publica
//Se der erro no console é pq precisa inserir public/ ou inserir / lá no path do stylesheet no link do html
server.use(express.static("public"))

//Utilizando template engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})


server.get('/', (req, res) => {
    //Com nunjucks>>>
    return res.render("index.html")
    //Sem nunjucks >>> res.sendFile(__dirname + "/views/index.html")
})

server.get('/create-point', (req, res) => {
    //Com nunjucks >>>
    return res.render("create-point.html");
    
    // Sem nunjucks >>> res.sendFile(__dirname + "/views/create-point.html")
})

server.get('/search', (req, res) => {
    //Com nunjucks >>>
    return res.render("search-results.html");
    // Sem nunjucks >>> res.sendFile(__dirname + "/views/create-point.html")
})




server.listen(8789);