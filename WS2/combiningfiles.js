const fs = require('fs');

var input = '';

// Read files and store data into variables
input = fs.readFileSync('greeting.txt', (err, data) =>{
  if (err) return console.error(err);
  input = data.toString() + '\n';
  return input;
});

input += fs.readFileSync('example.txt', (err, data) =>{
  if (err) return console.error(err);
  input = data.toString() + '\n';

  return input;
});

// Write content of the two files into another file

fs.writeFileSync('combined.txt', 'I wrote this\n', (err) => {
  if (err) return console.error(err);
});

fs.appendFileSync('combined.txt', input, (err) => {
  if (err) return console.error(err);
});

fs.appendFileSync('combined.txt', 'I wrote this', (err) => {
  if (err) return console.error(err);
});
