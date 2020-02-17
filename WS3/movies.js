const http = require('http');
const port = 5000;

var formatted_op = '';

// Define options for http.request() -funtion to use, to get data from API
const options = {
    host: 'www.omdbapi.com',
    path: '/?s=star+wars&r=json&apikey=cbbc6750'
}

// Request data from API
const request = http.request(options, (response)=>{
    var data = '';

    // Append response data to 'data' -variable
    response.on('data', (chunk)=>{
        data += chunk;
    })

    response.on('end', ()=>{

        // Convert data from string to JSON
        var json = JSON.parse(data);
        
        // Loop through response to test JSON
        for(var i in json.Search){
            console.log(json.Search[i].Title);
        }

        // Format JSON to HTML table

        formatted_op = '<table style="border: 1px solid black";><tr><th>Movie</th><th>Year</th></tr>';

        for(var i in json.Search){
            formatted_op += '<tr><th>' + json.Search[i].Title + '</th><th>' + json.Search[i].Year + 
                '</th></tr>';
        }

        formatted_op += '</table>'
        
    })
})

request.on('error', (err)=>{
    console.error(err.message);
})

request.end();

// Serve JSON to http server

http.createServer((request, response)=>{

    response.writeHead(200,{
        'Content-Type': 'text/html'
    });

    response.write(formatted_op);
    response.end();

}).listen(port);