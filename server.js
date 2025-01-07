// server.js
const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.static('docs')); // Serve static files from the 'public' folder

// Endpoint to read a file
app.get('/read-file', (req, res) => {
    fs.readFile('file.txt', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
        } else {
            res.send(data);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
