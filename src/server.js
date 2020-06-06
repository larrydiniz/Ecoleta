const express = require("express")  
const server = express() 

//TRAZER DB
const db = require("./database/db")

//CONFIGURAÇÃO PUBLIC
server.use(express.static("public")) 

//HABILITAR req.body
server.use(express.urlencoded({extended: true}))


//TEMPLATE ENGINE
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", { 
    express: server, 
    noCache: true 
} ) 

//CAMINHOS

//PAGES
server.get("/", (req,res) => { 
    return res.render("index.html") 
}) 

server.get("/create-point", (req,res) => { 
    //req.query: Query Strings da nossa url - get
    return res.render("create-point.html") 
})

server.post("/savepoint", (req,res) => {
    //req.body: O corpo do formulário
    //INSERIR DADOS NO DB
    const query = `
        INSERT INTO places (image,
            name,
            adress,
            adress2,
            state,
            city,
            items
            ) VALUES (?,?,?,?,?,?,?);
        `

    const values = [
        req.body.image,
        req.body.name,
        req.body.adress,
        req.body.adress2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err){
        if(err) {
            var error = true;
            return res.render("create-point.html", {error})
        }

        console.log("Cadastrado com sucesso!")
        console.log(this)

        return res.render("create-point.html", {saved: true})
    }

    db.run(query, values, afterInsertData)  
})

server.get("/search", (req,res) =>{
    const search = req.query.search

    if(search == ""){
        return res.render("search-results.html", {total: 0})
    }

    //trazer dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err,rows){ 
        if(err) {
            return console.log(err)
        }

        const total = rows.length

        return res.render("search-results.html", {places: rows, total: total}) 
    })   
})

//LIGAR SERVIDOR
server.listen(3000) 