//IMPORTAR DEPENDENCIA SQLite3
const sqlite3 = require("sqlite3").verbose() //método que vai configurar o sqlite3 como verbal

//CRIAR O OBJETO DB PARA OPERAÇÕES
const db = new sqlite3.Database("./src/database/database.db") //dentro do metódo database, o argumento cria um banco de dados no caminho estipulado

module.exports = db 
//UTILIZAR O OBJETO DB
/* db.serialize(() => {

    //criar tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER  PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            adress TEXT,
            adress2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)

    //inserir dados
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
        "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1101&q=80",
        "Papersides",
        "Guilherme Gemballa, Jardim América",
        "N° 360",
        "Santa Catarina",
        "Rio do Sul",
        "Papel e Papelão"
    ]

    function afterInsertData(err){
        if(err) {
            return console.log(err)
        }

        console.log("Cadastrado com sucesso!")
        console.log(this) //referencia a resposta da função run
    }

    db.run(query, values, afterInsertData)  //callback = executada assim que acabar de rodar o código (query e values)

    //consultar dados
    db.all(`SELECT * FROM places`, function(err,rows){ //rows - registros da tabela, em array
        if(err) {
            return console.log(err)
        }
        console.log("Aqui estão seus registros: ")
        console.log(rows)
    })
        
    //deletar dado
    db.run(`DELETE FROM places WHERE id = ?`, [2], function(err){ //deleta onde id for 1
        if(err) {
            return console.log(err)
        }
        console.log("Registro deletado com sucesso!")

    })   
}) */