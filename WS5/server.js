const express = require('express');
const app = express();
const port = 5000;

app.set('view engine', 'ejs');

// Data for users-route
let data = {users:[
  {name: 'John', age: 25},
  {name: 'Gary', age: 50},
  {name: 'Samantha', age: 34}
]};

// Get routes
app.get('/',(req,res)=>{
  res.render('pages/index',{
    new_heading: 'This was passed from the JS file',
    new_paragraph: 'Lorem ipsum...',
    new_footer: 'Here is the footer'
  });
});

app.get('/users', (req,res)=>{
  res.render('pages/users', data);
});

// Port configuration
app.listen(port, ()=>{
  console.log(`Listening port ${port}`);
});
