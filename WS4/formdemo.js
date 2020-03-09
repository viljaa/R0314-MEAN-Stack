const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

// Create express app
const app = express();
const port = 5000;

// Setup static directory
app.use(express.static('public'));
// Use body parser
app.use(bodyParser.urlencoded({extended:true}));

// GET Routes
app.get('/adduser', (req, res)=>{
    res.sendFile(__dirname + '/public/adduser.html');
});

app.get('/details', (req, res)=>{
  let data = require('./jsondata2.json');
  let output = "<table border='1px';>";

  for(var i in data){
    output += '<tr>' +
    '<td>' + data[i].Name + '</td>' +
    '<td>' + data[i].Email + '</td>' +
    '<td>' + data[i].Company + '</td>' +
    '<td>' + data[i].Date + '</td>' +
    '</tr>';
  }

  output += '</table>'

  res.send(output);
});

// POST routes
app.post('/adduser', (req, res)=>{

  let data = require('./jsondata2.json');

  // Create new entry
  data.push({
    'Name': req.body.name,
    'Email': req.body.email,
    'Date':new Date,
    'Company':req.body.company
  });

  // JSON object to string
  let data_to_String = JSON.stringify(data);

  // Update the data to the file
  fs.writeFile('jsondata2.json', data_to_String, (err)=>{
    if (err) return console.error(err);
    console.log('Data saved.');
  });

  res.send('Saved data to the file. See the updated data at /details.')

});

app.listen(port, ()=>{
    console.log('Listening port ' + port);
  });