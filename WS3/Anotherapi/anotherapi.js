const https  = require('https');
const port = 5000;
const fs = require('fs');

var options = {
    host:'api.darksky.net',
    path:'/forecast/1dce523b1188b2c85256df6c91f1c83e/60.192059,24.945831'
}

const request = https.request(options, (response)=>{
    var data = '';

    response.on('data', (chunk)=>{
        data += chunk;
    })

    response.on('end', ()=>{

        var json = JSON.parse(data);

        console.log(json);

    })
})

request.on('error', (err)=>{
    console.error(err.message);
})

request.end();