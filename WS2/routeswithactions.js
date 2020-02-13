const http = require('http');
const port = 7000;
const fs = require('fs');

http.createServer((request, response) => {

    // ROUTES

    // Output hard coded plain text
    if(request.url == '/'){
        response.writeHead(200, {
            'Content-Type':'text/html'
        });
        response.end('Nothing to see here.');
    }

    // Load page from html
    else if(request.url == '/frontpage'){
        var path = 'frontpage.html';
        var type = 'text/html';
        getPage(path, type, response);
    }

    else if(request.url == '/contact'){
        var path = 'contact.html';
        var type = 'text/html';
        getPage(path, type, response);
    }

    // Output loaded textfile
    else if(request.url == '/plaintext'){
        var path = 'textfile.txt';
        var type = 'text/html';
        getPage(path, type, response);
    }

    // Output JSON file

    else if(request.url == '/json'){
        var path = 'sampledata.json';
        var type = 'application/json'
        getPage(path, type, response);
    }

    

}).listen(port);

console.log('Server is running at port: ' + port);

function getPage(path, type, response){
    fs.readFile(path, (err, data) =>{
        if (err) return console.error(err);

        response.writeHead(200, {
            'Content-Type': type
        });
        response.write(data);
        response.end();
    });
}