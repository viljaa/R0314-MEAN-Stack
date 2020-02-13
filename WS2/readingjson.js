const fs = require('fs');
const http = require('http');
const port = 5050;

var json = require('./sampledata.json');

var newItem = {
    name: 'John Doe',
    age: '52',
    company: 'Laurea',
    address: 'Ratatie 22'
    }

json.push(newItem);

delete json[0];

json = JSON.stringify(json);
            
fs.writeFile('dataset.json', json, (err)=>{
    if (err) return console.error(err);
})

http.createServer((request,response)=>{
    response.writeHead(200,{
        'Content-Type': 'text/json'
    })

    var output = require('./dataset.json');
    response.write(JSON.stringify(output));
    response.end();

}).listen(port);