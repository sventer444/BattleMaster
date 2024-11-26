const express = require("express");
const fs = require('fs');
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static('public'));

app.get('/iconList', (req, res) => {
    const iconDir = './public/assets/BigIcons/';
    fs.readdir(iconDir, (err, files) => {
        if (err) {
            res.status(500).send('Error reading directory');
        } else {
            const icons = files.filter(file => file.endsWith('.png'));
            res.json(icons);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
