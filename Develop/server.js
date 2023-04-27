const express = require('express')
const path = require('path');
const notes = require('./db/db.json')
const uuid = require('./helpers/fsUtils');

const PORT = process.env.port || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);

// get's for the html's
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});



app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);