const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();

// Use bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// Log all incoming requests
app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    console.log('Query Params:', req.query);
    console.log('Body:', req.body);
    console.log('-----------------------------');

    const data = `Incoming Request: ${JSON.stringify(req.method)} ${JSON.stringify(req.url)}\nHeaders:', ${JSON.stringify(req.headers)}\nQuery Params:', ${JSON.stringify(req.query)}\nBody:', ${JSON.stringify(req.body)}\n-----------------------------\n`;

    fs.appendFile(`requests.log`, data, (err) => {
        if (err) {
          console.error('Error writing to file:', err);
        } else {
          console.log('File has been written successfully!');
        }
    });

    res.send("Hi")
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});