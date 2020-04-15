/* Modules */
const mongoose = require('mongoose');
const express = require('express');

// App setup
const app = express();

// Serve static files
app.use(express.static('public'));

// Connect to MongoDB
const uri = 'mongodb+srv://testuser:demopass@cluster0-73nr8.mongodb.net/sample_airbnb';
mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology:true});

// Mongoose schema
const listing = mongoose.model(
    'Listing',{
        _id: String,
        name: String,
        country: String
    },
    'listingsAndReviews'
);

/* Routes */

// Landing page
app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/public/index.html');
});

// Query for all listings limited to 20 first results
app.get('/api/getListings',(req,res)=>{
    listing.find({},null,{limit:20},(err, results)=>{
        if(err){
            console.error(err);
            res.status(500).send('Error 500; error occured while fetching data from the database.')
        }
        else{
            res.status(200).json(results);
        };
    });
});

// Query for listings with specified id
app.get("/api/getListing/:id", (req,res)=>{
    listing.findById(req.params.id,(err, results)=>{
        if(err){
            console.error(err);
            res.status(500).send('Error 500; error occured while fetching data from the database.')
        } 
        else{
        res.status(200).json(results);
        };
    });
});

// Add listings
app.post('/api/addListing/id=:id/name=:name/country=:country', (req,res)=>{  // API POST example: /api/addListing/id=124535/name=Tykkimäki/country=Finland
    let entry = {
        _id: req.params.id,
        name : req.params.name,
        country: req.params.country
    };

    // Check if already exists
    listing.exists({_id:entry._id},(err,result)=>{
        if (result == true){
            console.log('Insert blocked; duplicate entry');
            res.status(403).send("ID already exsists, can't create duplicate entries.");
        }
        // If not, insert data to DB
        else{
            mongoose.connection.collection('listingsAndReviews').insert(entry, (err, result)=>{
                if(err){
                    console.error(err);
                    res.status(500).send('Error occured while creating a new entry.');
                }
                else{
                    console.log(`Inserted: ${result.insertedCount}`);
                    console.log(`Entry saved! ID: ${entry._id}`);
                    res.status(200).send(`New entry with id ${entry._id} added successfully to the database!`);
                };
            });
        };
    });
});

// Delete listings
app.delete('/api/deleteListing/:id', (req,res)=>{
    let id = req.params.id;

    listing.findByIdAndDelete(id,(err, result)=>{
        if (err){
            console.error(err);
            res.status(500).send('Error occured while deleting entry.');
        }
        else{
            console.log(`Entry with ID:${id} deleted successfully.`);
            res.status(200).send(`Entry with ID:${id} deleted successfully.`);
        };
    });
});

// Update listings
app.patch('/api/updateListing/id=:id/name=:name/country=:country',(req,res)=>{
    let id = req.params.id;
    let update = {
        name : req.params.name,
        country: req.params.country
    };

    listing.findByIdAndUpdate(id, update, {new:true},(err,result)=>{
        if (err){
            console.log('Error occured while trying to update entry.')
            console.error(err);
            res.status(500).send('Error occured while trying to update entry. Update aborted.');
        }
        else{
            console.log(`Entry with id ${id} updated successfully!`);
            console.log(result);
            res.status(200).send(`Entry with id ${id} updated successfully!`);
        };
    });
});

// Port config
const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`Listening to port ${port}`);
});