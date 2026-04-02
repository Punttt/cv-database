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

client.connect((err)=>{
    if(err){
        console.log(`Connection error: ${err}`);
    } else {
        console.log(`Connected to database!`);
    }
});

// Routing
app.get("/", (req, res)=>{
    res.render("index", {
        error: ""
    })
});

app.post("/", async(req, res)=>{
    let name = req.body.name;
    let code = req.body.code;
    let url = req.body.url;
    let progression = req.body.progression;

    let error = "";
    let success = ""; // För att lagra en notis om att detlagrades i databasen

    // Rätt validering
    if (name === "" || code === "" || url === "" || progression === "") {
        error = "Du har glömt att fylla i alla fält!";
        return res.render("index", { error });
    }

    try {
        // Lagra i databasen här
        const result = await client.query(
            "INSERT INTO cv_database(name, code, url, progression)VALUES($1, $2, $3, $4)",[name, code, url, progression]

        );
        res.redirect("/");

    } catch(error){
        console.log(error);
        res.render("index", { error: "Ett fel uppstod vid lagring." });
    }
});

// Startar applikationen
app.listen(process.env.PORT, ()=>{
    console.log(`Server startad på http://localhost:${process.env.PORT}`);
})