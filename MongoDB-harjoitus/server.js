// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoClient = require('mongodb').MongoClient;

// App setup
const app = express();

// Implement bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB configuration variables
const password = 'demopassword';
const uri = `mongodb+srv://InterfaceApp:${password}@cluster0-mtsye.mongodb.net/test`;

// Serve static content
app.use(express.static('public'));

// GET-routes
app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/public/form.html');
});

app.get('*', (req,res)=>{
    res.send('Error 404, page not found.')
});

// POST-routes

app.post('/submit', (req,res)=>{
    // Get data from the recieved form
    let email = req.body.email;
    let password = req.body.password;

    // Create Connection Object
    const client = new mongoClient(uri,{
        useNewUrlParser: true
    });

    // Create json object for the new user
    let newUser = {
        email : email,
        password : password
    };

    // Connect to DB
    client.connect(err=>{
        const collection = client.db('harjoitusDB').collection('users');

        if (err) throw err;

        collection.insertOne(newUser, (err, r)=>{
            console.log(r.insertedCount);
        });

        client.close();
    });

    res.send('User registered to database!');
});

app.post('/queryDB', (req,res)=>{
    res.send('Tietokantakysely');
});

//Port config
const port = 5000;
app.listen(port,()=>{
    console.log(`Listening port ${port}`);
});