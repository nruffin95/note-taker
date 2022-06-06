// Dependencies
const express = require("express")
const path = require('path');
const fs = require('fs');


// Handling Async Process
const readFileAsync = (fs.readFile);
const writeFileAsync = (fs.writeFile);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static Middleware
app.use(express.static("./develop/public"));

//API ROUTE | "GET" request
app.get("/api/notes", (req, res) => {
    readFileAsync("./develope/db/db.json", "utf8").then(function(data) {
        notes = [].concat(JSON.parse(data))
        res.json(notes);
    })
})

//API ROUTE | "POST" request
app.get("/api/notes", (req, res) => {
    const note = req.body;
    readFileAsync("./develope/db/db.json", "utf8").then(function(data) {
        const notes = [].concat(JSON.parse(data))
        note.id = notes.length + 1
        notes.push(note);
        return notes
    }).then(function(notes) {
        writeFileAsync("./develope/db/db.json", JSON.stringify(notes))
        res.json(note);
    })
})

//API ROUTE | "POST" request
app.get("/api/notes", (req, res) => {
    const note = req.body;
    readFileAsync("./develope/db/db.json", "utf8").then(function(data) {
        const notes = [].concat(JSON.parse(data))
        note.id = notes.length + 1
        notes.push(note);
        return notes
    }).then(function(notes) {
        writeFileAsync("./develope/db/db.json", JSON.stringify(notes))
        res.json(note);
    })
})


// API ROUTE | "DELETE" request
app.delete("/api/notes/:id", function(req, res) {
    const idToDelete = parseInt(req.params.id)
    readfileAsync("./develop/db/db.json", "utf8").then(function (data){
    const notes = [].concat(JSON.parse(data)) 
    const newNotesData = []
    for (let i = 0; i < notes.length; i++){
        if(idToDelete !== notes[i].id) {
            newNotesData.push(notes[i])
        }
    } 
    return newNotesData
    }).then(function(notes) {
        writeFileAsync("./develope/db/db.json", JSON.stringify(notes))
        res.send('saved success!!!');
    })
})

// HTML Routes

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./develop/public/notes.html"))
})
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./develop/public/notes.html"))
})
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./develop/public/notes.html"))
})

// Listening
app.listen(PORT, function(){
    console.log("App listening on PORT " + PORT)
})
    
