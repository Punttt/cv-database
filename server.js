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
app.get("/", async (req, res)=>{
    try {
        const result = await client.query("SELECT * FROM courses ORDER BY id DESC");

        res.render("index", {
            courses: result.rows,
            error: ""
        });        
    } catch(err){
        console.log(err);

        res.render("index", {
            courses: [],
            error: "Kunde inte hämta några kurser."
        })
    }
});

app.get("/addcourse", (req, res) => {
    res.render("addcourse", { error: "" });
});

app.get("/about", (req, res) => {
    res.render("about", { error: "" });
});

// Tar bort kurser
app.post("/delete", async(req, res)=>{
    const id = req.body.id;

    try {
        await client.query("DELETE FROM courses WHERE id = $1", [id]);
        res.redirect("/");
    } catch (err) {
        console.log(err);
        res.redirect("/");
    }
})

// Lägger till kurser 
app.post("/addcourse", async(req, res)=>{
    let name = req.body.name;
    let code = req.body.code;
    let url = req.body.url;
    let progression = req.body.progression;

    let error = "";
    let success = ""; // För att lagra en notis om att detlagrades i databasen

    // Rätt validering
    if (name === "" || code === "" || url === "" || progression === "") {
        error = "Du har glömt att fylla i alla fält!";
        return res.render("addcourse", { error });
    }

    try {
        // Lagra i databasen här
        const result = await client.query(
            "INSERT INTO courses(name, code, url, progression)VALUES($1, $2, $3, $4)",[name, code, url, progression]

        );
        res.redirect("/addcourse");

    } catch(error){
        console.log(error);
        res.render("addcourse", { error: "Ett fel uppstod vid lagring." });
    }
});

// Startar applikationen
app.listen(process.env.PORT, ()=>{
    console.log(`Server startad på http://localhost:${process.env.PORT}`);
})