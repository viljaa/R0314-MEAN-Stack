const fs = require('fs');

console.log('Program started.');

fs.readFile('greeting.txt', (err, data) =>{
  if (err) return console.error(err);
  console.log('The first file:');
  console.log(data.toString());

  fs.readFile('example.txt', (err, data) =>{
    if (err) return console.error(err);
    console.log('The second file:');
    console.log(data.toString());
  });
});

console.log('Program ended.');
