const http  = require('http');
const https = require('https');
const port = process.env.PORT || 5000;
const fs = require('fs');

// Express setup
const express = require('express');
const app = express();

app.use(express.static('public')); // Serve static HTML-file

//Socket setup
const server = http.createServer(app);
server.listen(port, ()=>{
    console.log('Listening port: ' + port);
})
const socket = require('socket.io');
const io = socket(server);

io.on('connection', (socket)=>{

    console.log('Socket ' + socket.id + ' connected.')
    // On connection get data from API
    updateData()
    // Try-catch just in case the weatherdata.json file is empty. Avoids ending the execution.
    try {
        let jsondata = fs.readFileSync('./weatherdata.json');
        jsondata = jsondata.toString();
        socket.emit('updated_data', jsondata);
    } catch (error) {
        console.error(error);
    }

    // On refresh event get updated data from API and emit it to client
    socket.on('refresh', ()=>{
        updateData();
        let jsondata = fs.readFileSync('./weatherdata.json');
        jsondata = jsondata.toString();
        socket.emit('updated_data', jsondata);
    })
})

/*FUNCTIONS*/
function updateData(){
    
    let json = '';

    const options = {
        host:'api.darksky.net',
        path:'/forecast/{your API key}/60.192059,24.945831' // Add your own Darksky API-key to "{your API key}"
    }

    const request = https.request(options, (response)=>{
        var data = '';

        response.on('data', (chunk)=>{
            data += chunk;
        })

        response.on('end', ()=>{

            json = data;
            fs.writeFileSync('./weatherdata.json', json, (err)=>{
                if (err) return console.error(err);
            })
        })
    })

    request.on('error', (err)=>{
        console.error(err.message);
    })

    request.end();
}