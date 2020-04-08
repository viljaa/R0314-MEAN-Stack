/* -- APPLICATION --*/

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoClient = require('mongodb').MongoClient;

// App setup
const app = express();

// Set up view engine
app.set('view engine', 'ejs');

// Implement bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB configuration variables
const dbPassword = 'demopassword';
const uri = `mongodb+srv://InterfaceApp:${dbPassword}@cluster0-mtsye.mongodb.net/test`;

// Serve static content
app.use(express.static('public'));

// GET-routes
app.get('/', (req, res)=>{
    res.render('pages/form');
});

app.get('*', (req,res)=>{
    res.send('Error 404, page not found.')
});

// POST-routes

app.post('/submit', (req,res)=>{
    // Get data from the recieved form
    let email = req.body.email;
    let password = req.body.password;

    validateSubmit(email, password, res);
    
});

app.post('/queryDB', (req,res)=>{

    // Get data from the recieved form
    let email = req.body.email;
    let password = req.body.password;

    validateLogIn(email, password, res);
    
});

//Port config
const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Listening port ${port}`);
});

/* -- FUNCTIONS -- */

function validateLogIn(email, password, res){
    // Create Connection Object
    const client = new mongoClient(uri,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    // Connect to DB
    client.connect(err=>{
        const collection = client.db('harjoitusDB').collection('users');

        if (err) throw err;
        // Query to DB
        collection.find({'email':email, 'password': password}).count((err,r)=>{
            console.log('Found matches: ' + r);

            if (r==1){
                res.render('pages/loginResult', {data:{matches:r,email:email}});
            }
            else if (r==0){
                res.render('pages/loginResult', {data:{matches:r}});
            }
            else{
                console.log('Error, found multiple matches.');
                res.send('Error, found multiple matches.');
            };

        });

        client.close();
    });
}

function validateSubmit(email, password, res){
    // Create connection object
    const client = new mongoClient(uri,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    // Connect to DB
    client.connect(err=>{
        const collection = client.db('harjoitusDB').collection('users');
        if (err) throw err;

        // Query if user already exists and register user if no matches are found
        collection.updateOne({'email':email},{$set:{'email':email,'password': password}}, {upsert:true}, (err,r)=>{
            if (err) throw err;

            if(r.matchedCount == 0 && r.upsertedCount == 1){
                console.log('User registered to DB.');
                res.render('pages/registered', {data:{matches:0, email: email}});
                client.close();
            }
            else{
                console.log('Submit denied: user already exists.');
                res.render('pages/registered', {data:{matches:1}});
                client.close();
            };
        });
    });
}