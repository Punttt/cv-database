const { Client } = require("pg");
require("dotenv").config();
const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended : true }));

// Anslut till databasen
const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: false,
    },
});

// Routing
app.get("/", (req, res)=>{
    res.render("index")
});

app.post("/", async(req, res)=>{
    const name = req.body.name;
    const code = req.body.code;
    const url = req.body.url;
    const progression = req.body.progression;
    const error = "";

    if( name === "" || code === "" || url === "" || progression === ""){
        return res.redirect("/");
    } 

    try{

        res.redirect("/");
    } catch(error){
        console.log(error);
        res.redirect("/");
    } 
});

// Startar applikationen
app.listen(process.env.PORT, ()=>{
    console.log(`Server startad på http://localhost:${process.env.PORT}`);
})