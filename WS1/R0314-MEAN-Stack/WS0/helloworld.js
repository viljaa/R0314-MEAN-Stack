const http = require('http');
const port = 8081;

http.createServer((request, response) =>{
  response.writeHead(200, {'Content-Type': 'text/html'});

  response.write(`<html><body> <table style="width:100%; text-align: center;">
  <tr>
    <th>Firstname</th>
    <th>Lastname</th>
    <th>Age</th>
  </tr>
  <tr>
    <td> <a href="https://www.w3schools.com/html/">Jill HTML</a></td>
    <td>Smith</td>
    <td>50</td>
  </tr>
  <tr>
    <td>Michael</td>
    <td>Jackson</td>
    <td>94</td>
  </tr>
</table> </body></html>`);
}).listen(port);

console.log('Server is running.');
