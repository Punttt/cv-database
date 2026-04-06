# CV DATABAS
Skapad med: Express, EJS, PostgreSQL, Node.js, PG, dotenv, CSS

## Syfte
Detta projekt är en enkel webbapplikation där användaren kan lägga till, visa och radera kurser i en databas.
Användaren fyller i:
  - Kursnamn
  - Kurskod
  - Progression
  - Länk till kursplan
Applikationen är byggd som en del av kursen Backend-baserad webbutveckling.

## Databasstruktur
### Tabell: Courses
courses(id(PK), name, code, url, progression)
### ER-diagram
Jag gjorde ett enkelt ER-diagram med med tillägget draio i VS Code.
![er-diagram](/assets/er-diagram-cv.png)

## Sidor i applikationen
Webbplatsen innehåller tre sidor:
  - / Startsida som listar alla kurser
  - /addcourse formulär för att lägga till kurs
  - /about om sidan
Respektive undersida renderas med ejs

## Funktionalitet
### Via kurser (Read)
Alla kurser hämtas från databasen och visas i en tabell. Kurskod är klickbar och leder till kursplanssidan.

### Lägg till kurser (Create)
Formulär på /addcourse, server validerar att alla fält är ifyllda och felmeddelande skrivs ut i EJS-vyn

### Radera kurs (Delete)
Varje rad har en radera knapp, ED skickas via hidden -input. Serverrr tar bort kursen från databasen.

## Validering
All input valideras på serversidan och eventuella felmeddelande vid saknade fält renderas i ejs-vyn.

## HTML/CSS
Webbplatsen använder egenskriver CSS via /public, layouten är responsiv och fungera både på desktop och mobila enheter.
Navigeringen är enkel men tydlig.

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
