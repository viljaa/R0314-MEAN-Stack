const endpoint = 'http://localhost:5000';
const socket = io.connect(endpoint);

/*Listen events*/

// Handle updated data and parse to browser
socket.on('updated_data',(jsondata)=>{

    // Parse data from file to json format
    json = JSON.parse(jsondata);
    // Format output
    let output = '<tr><th>Timezone</th><th>Time</th><th>Weather</th><th>Temperature &#8451;</th><th>Wind speed (m/s)</th><th>Humidity %</th></tr>'
        + '<tr><td>' + json.timezone + '</td><td>' + convert_time(json.currently.time) + '</td><td>' + json.currently.summary + '</td><td>'
        + convert_temperature(json.currently.temperature) + '</td><td>' + convert_windSpeed(json.currently.windSpeed) + '</td><td>' + json.currently.humidity
        + '</td></tr>';
    // Output to browser
    let table = document.getElementById('data_table');
    table.innerHTML = output;
})
/*Emit events*/

// Refresh data on screen
function refresh(){
    console.log('click');
    socket.emit('refresh');
}

/*Functions*/
function convert_time(timestamp){

    // Convert timestamp to date
    let date = new Date(timestamp*1000) // Multiply timestamp with 1000 to convert it from seconds to milliseconds

    // Parse hours, minutes and seconds form date
    let hours = date.getHours();

    let minutes = date.getMinutes();
    if (minutes < 10){
        minutes = '0' + minutes;
    }

    let seconds = date.getSeconds();
    if (seconds < 10){
        seconds = '0' + seconds;
    }

    // Format wanted output
    let output = hours + ':' + minutes + ':' + seconds;

    console.log('Aika:' + output);

    return output;
}

function convert_temperature(farenheit){
    let celcius = ((farenheit-32)/1.8).toFixed(2);
    return celcius;
}

function convert_windSpeed(mph){
    // Speed from mph to m/s
    let m_per_s = (0.44704 * mph).toFixed(2);
    return m_per_s;
}

function format_output(json){
    // Title and title row for table
    let output = '<h1>Weather in Helsinki</h1><table style="border: 1px solid black";><tr><th>Timezone</th><th>Time</th><th>Summary</th><th>Temperature &#8451;</th><th>Humidity(%)</th><th>Wind speed (m/s)</th></tr>';

    // Add data to output
    output += '<tr><th>' + json.timezone + '</th><th>' + convert_time(json.currently.time) + '</th><th>'
        + json.currently.summary + '</th><th>' + convert_temperature(json.currently.temperature) + '</th><th>'
        + json.currently.humidity + '</th><th>' + convert_windSpeed(json.currently.windSpeed) + '</th></tr></table>';

    return output;

}