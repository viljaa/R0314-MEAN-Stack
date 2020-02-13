const fs = require('fs');

var directory = fs.readdirSync('./');

for (var i in directory){
  console.log(directory[i]);
}
