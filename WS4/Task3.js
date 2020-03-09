const express = require('express');
const app = express();
const port = 5000;
const fs = require('fs');

app.use(express.static('public'));

app.get('/', (req, res)=>{
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/list', (req, res)=>{
  res.sendFile(__dirname + '/exampledata.txt');
});

// Raw JSON data
app.get('/jsondata', (req, res)=>{
  let data = require('./jsondata.json');
  res.json(data);
});

// Formatted JSON data
app.get('/details', (req, res)=>{
  let data = require('./jsondata.json');
  let output = "<table border='1px';>";

  for(var i in data){
    output += '<tr>' +
    '<td>' + data[i].Name + '</td>' +
    '<td>' + data[i].Email + '</td>' +
    '<td>' + data[i].Date + '</td>' +
    '<td>' + data[i].Company + '</td>' +
    '</tr>';
  }

  output += '</table>'

  res.send(output);
});

app.get('/add', (req, res)=>{

  let data = require('./jsondata.json');

  data.push({
    'Name':'Jorma',
    'Email':'jorma78@gmail.com',
    'Date':'13-11-13',
    'Company':'Jorman Puutavara Tmi'
  });

  let data_to_String = JSON.stringify(data);

  fs.writeFile('jsondata.json', data_to_String, (err)=>{
    if (err) return console.error(err);
    console.log('Data saved.');
  });

  res.send('Saved data to the file. See the updated data at /details.')

});

// Error 404 page
app.get('*', (req, res)=>{
  res.status(404).send('Error 404: Page not found.');
});

app.listen(port, ()=>{
  console.log('Listening port ' + port);
});
