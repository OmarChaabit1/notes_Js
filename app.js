const express = require('express');
const fs = require('fs');
const{middleWareVerfication} = require('./utils')
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("./static"));


app.get("/notes", (req, res) => {
    fs.readFile("./db/notes.json", (err, dataFile) => {
        let notes = JSON.parse(dataFile.toString()).notes;
        if (err)
            return res.status(404).send("Error on the server ");
        res.status(200).json(notes);
    });
});

app.post("/notes", middleWareVerfication, (req, res) => {
    let { image,note } = req.body;
    fs.readFile("./db/notes.json", (err, dataFile) => {
        let data = JSON.parse(dataFile.toString());
        let notes = data.notes;
        let notesToSave = {
            id: data.lastId,
            image,
            note
        };
        notes.push(notesToSave);
        data.lastId++;
        fs.writeFile("./db/notes.json", JSON.stringify(data, null, 4), (err) => {
            if (err)
                return res.status(500).send("Error on the server ");
            res.status(201).json(notesToSave);
        });
    });
});

app.delete("/notes/:id", (req, res) => {
    let { id } = req.params;
    fs.readFile("./db/notes.json", (err, dataFile) => {
        if (err)
            return res.status(500).send("Error on the server ");
        let data = JSON.parse(dataFile.toString());
        let notes = data.notes;
        let notesIndex = notes.findIndex(ele => ele.id == id);
        if (notesIndex == -1)
            return res.status(404).send("Question Not Found");
        data.notes = notes.filter(ele => ele.id != id);
        fs.writeFile("./db/notes.json", JSON.stringify(data, null, 4), (err) => {
            if (err)
                return res.status(500).send("Error on the server ");
            res.status(200).send("The note deleted successfully!");
        });

    });
});

app.put("/notes/:id", middleWareVerfication, (req, res) => {
    // Handle book update logic
});
app.listen(PORT,() => {
    console.log('Server started at : ',PORT);
});
