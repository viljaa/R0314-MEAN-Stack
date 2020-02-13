const fs = require('fs');

fs.unlink('combined.txt', (err) =>{
  if(err) return console.error(err);
  console.log('File combined.txt was deleted.');
});
