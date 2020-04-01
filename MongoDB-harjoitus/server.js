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
        useNewUrlParser: true,
        /*useUnifiedTopology: true --- For some reason this crashes node when used with insert query*/
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
        // Make qurey that inserts new data into DB
        collection.insertOne(newUser, (err, r)=>{
            console.log(r.insertedCount);

            if (r.insertedCount > 0){
                res.sendFile(__dirname + '/public/registered.html');
            }
            else if (err){
                throw err
            };
        });

        client.close();
    });
});

app.post('/queryDB', (req,res)=>{

    // Get data from the recieved form
    let email = req.body.email;
    let password = req.body.password;

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
                res.sendFile(__dirname + '/public/loginSuccess.html');
            }
            else if (r==0){
                res.sendFile(__dirname + '/public/loginDenied.html');
            }
            else{
                console.log('Error, found multiple matches.');
            };

        });

        client.close();
    });
    
});

//Port config
const port = 5000;
app.listen(port,()=>{
    console.log(`Listening port ${port}`);
});