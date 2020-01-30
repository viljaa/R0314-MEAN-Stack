const http = require('http');
const port = 8081;

http.createServer((request, response) =>{

  //Routes

  if ( request.url === "/"){
    response.writeHead(200, {'Content-Type': 'text/html'});

    response.end('Hoi maailma');
  }

  else if (request.url === "/helloworld") {
    response.writeHead(200, {'Content-Type': 'text/html'});

    response.end('Hello world in HTML');
  }
  else if ( request.url === "/homepage" ) {
    response.writeHead(200, {'Content-Type': 'text/html'});

    response.end('HOMEPAGE');
  }

}).listen(port);

console.log('Server is running.');
