const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sqlCreateTable = "CREATE TABLE IF NOT EXISTS people (id INT NOT NULL  AUTO_INCREMENT, name VARCHAR(255) NOT NULL, PRIMARY KEY (id))";
const sqlInsert = `INSERT INTO people(name) values('Dani')`

connection.query(sqlCreateTable)
connection.query(sqlInsert)
connection.end()

function readDb() {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(config)
        const sqlSelect = `SELECT name FROM people`
        // connection.query(sqlSelect, (result) => {
        //     resolve(result);
        //     connection.end()
        // })
        connection.query(
            sqlSelect, 
            function(err, rows){                                                
                if(rows === undefined){
                    reject(new Error("Error rows is undefined"));
                }else{
                    resolve(rows);
                }
                connection.end()
            })
    });
}

app.get('/', async (req,res) => {
    const data = await readDb();
    res.send('<h1>Full Cycle Rocks!</h1><p>' + JSON.stringify(data) + '</>')
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})
