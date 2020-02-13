const fs = require('fs');
const http = require('http');
const port = 5000;

htmlOutput();

http.createServer((request, response) => {

    if (request.url == '/'){
        response.writeHead(200, {'Content-Type': 'text/html'});

        fs.readFile('jsonpage.html', (err, data)=>{
            if(err) return console.error(err);

            response.write(data);
            response.end();
        });
    }
}).listen(port);

console.log('Server is running at port: ' + port);

// Functions for different outputs

function stringOutput(){
fs.readFile('sampledata.json', (err,data) => {
    if (err) return console.error(err);

    // Data to JSON
    var json = JSON.parse(data);

    // Output JSON
    for(var i in json){
        console.log(json[i].name);
        console.log(json[i].age);
        console.log(json[i].company);
        console.log(json[i].address);
        console.log('');
    }
})
};

function htmlOutput(){

    var finalOutput='';

    fs.readFile('sampledata.json', (err,data) => {
        
        if (err) return console.error(err);
    
        // Data to JSON
        var json = JSON.parse(data);
        
        // Format JSON data to html

        finalOutput = '<table border="1">';

        for(var i in json){
            finalOutput += '<tr><td>' + json[i].name +
            '</td><td>' + json[i].age + '</td><td>' +
            json[i].company + '</td><td>' + json[i].address + 
            '</td></tr>'
        }

        finalOutput += '</table>'

        fs.writeFile('jsonpage.html', finalOutput, (err)=>{
            if (err) return console.error(err);
        })

        console.log(finalOutput);

        
    })

    return finalOutput;
}