const { Client } = require("pg");
require("dotenv").config();

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
        createTables();
    }
});

async function createTables() {
    try{
        const res = await client.query(`
                DROP TABLE IF EXISTS courses;
                CREATE TABLE IF NOT EXISTS courses(
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    code VARCHAR(255) NOT NULL,
                    url VARCHAR(255) NOT NULL,
                    progression VARCHAR(1) NOT NULL,
                    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `)
            console.log(res);
    } catch(err) {
        console.error(err);
    } finally {
        await client.end();
    }
}