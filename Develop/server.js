const express = require('express')
const path = require('path');
const notes = require('./db/db.json')
const uuid = require('./helpers/fsUtils');
const fs = require('fs')


const PORT = process.env.port || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
// app.use('/api', api);

// get's for the html's
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', (err, data)=>{
    if (err){
      console.log(err)
      return
    }
   var value = JSON.parse(data)
   res.json(value)
  })
});

app.post('/api/notes', (req, res)=>{
  fs.readFile('./db/db.json', (err, data)=>{
    if (err){
      console.log(err)
      return
    }
  var value = JSON.parse(data)
  value.push(req.body)
  
  fs.writeFile('./db/db.json', JSON.stringify(value),(err)=>{
if (err){
  console.log(err)
  return
}
res.json({message:'succses'})
  })
  })
})


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);