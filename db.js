const sqlite3= require('sqlite3').verbose()
const db = new sqlite3.Database('./ws.db')

db.serialize(function() {

    // db.run (`
    // DROP TABLE ideas;
    // `)
    //CRIAR TABELA
    db.run (`
        CREATE TABLE IF NOT EXISTS ideas(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            title TEXT,
            category TEXT,
            description TEXT,
            link TEXT
        );
    `) 

    //INSERIR DADOS
    
            
       /*const query = `
        INSERT INTO ideas (
            image,
            title,
            category,
            description,
            link
        ) VALUES (?,?,?,?,?);
        `    
    const values = [
        "https://image.flaticon.com/icons/svg/925/925810.svg",
        "Exercicio",
        "Saúde",
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        "https://rocketseat.com.br"
           
    ]
    db.run(query, values, function(err){
        if (err) return console.log(err)

        console.log(this)
    }) */
    
    //CONSULTAR DADOS
   /*db.all(`SELECT * FROM ideas`, function(err, rows){
        if (err) return console.log(err)
        console.log(rows)
    })*/


    //DELETAR

    /*db.run (` DELETE FROM ideas WHERE id = ?`, [], function(err) {
        if (err) return console.log (err)
        console.log("DELETEI", this)
    })*/
    
})

module.exports = db

