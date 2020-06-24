const express = require("express")
const server = express ()

const db = require ("./db")

/*const ideas = [
    {
        img:"https://www.flaticon.com/premium-icon/icons/svg/2887/2887731.svg",
        title:"Curso de Programação",
        category:"Estudo",
        description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        url:"https://rocketseat.com.br"
    },
    {
        img:"https://image.flaticon.com/icons/svg/925/925810.svg",
        title:"Exercicio",
        category:"Saúde",
        description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        url:"https://rocketseat.com.br"
    },
    {
        img:"https://image.flaticon.com/icons/svg/926/926165.svg",
        title:"Meditação",
        category:"Mentalidade",
        description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        url:"https://rocketseat.com.br"
    },
    {
        img:"https://image.flaticon.com/icons/svg/3043/3043892.svg",
        title:"Karaokê",
        category:"Diversão em Família",
        description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        url:"https://rocketseat.com.br"
    },
    {
        img:"https://www.flaticon.com/premium-icon/icons/svg/2950/2950882.svg",
        title:"Pintura",
        category:"Criatividade",
        description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        url:"https://rocketseat.com.br"
    },
    {
        img:"https://image.flaticon.com/icons/svg/3028/3028999.svg",
        title:"Video Game",
        category:"Competição",
        description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        url:"https://rocketseat.com.br"
    },
]*/


server.use(express.static("public"))

server.use(express.urlencoded ({extended: true}))

const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express:server, 
    noCache:true,
})

server.get("/", function(req, res){

    db.all(`SELECT * FROM ideas`, function(err, rows){
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }

        const reversedIdeas = [...rows].reverse()

        let lastIdeas=[]
        for (let idea of reversedIdeas) {
            if (lastIdeas.length <2) {
                lastIdeas.push(idea)
            }   
        }   
        
        return res.render("index.html", {ideas: lastIdeas})
       
    })
   
})

server.get("/ideias", function(req, res){
    db.all(`SELECT * FROM ideas`, function(err, rows){
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }
        const reversedIdeas = [...rows].reverse()

        return res.render("ideias.html", {ideas:reversedIdeas})
    })
})  

server.post("/", function(req, res){
    const query = `
    INSERT INTO ideas (
        image,
        title,
        category,
        description,
        link
    ) VALUES (?,?,?,?,?);
    `    
    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,   
    ]

    db.run(query, values, function(err){
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }

        return res.redirect("/ideias")
    })           
})

server.listen(3000)
