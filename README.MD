# CV DATABAS
Skapad med: Express, EJS, PostgreSQL, Node.js, PG, dotenv, CSS

## Syfte
Detta projekt är en enkel webbapplikation där användaren kan lägga till, visa och radera kurser i en databas.
Genom att lägga till Kursnamn, Kurskod, progression och länk till kursplan.

Applikationen är byggd som en del av kursen Backend-baserad webbutveckling.

## Databasstruktur
### Tabell: Courses
courses(id(PK), name, code, url, progression)
### ER-diagram
Jag gjorde ett enkelt ER-diagram med med tillägget draio i VS Code.
![er-diagram](/assets/er-diagram-cv.png)

## Installation
Klona projektet:
```
git clone https://github.com/Punttt/cv-database.git
cd cv-database
```

Installera, starta & bygga:
```
npm install
npm run dev
npm run start
```



### Publicerad webbplats
Render: https://cv-database.onrender.com/

Skapad av: Pontus Johansson
