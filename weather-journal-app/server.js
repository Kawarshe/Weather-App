// Setup empty JS object to act as endpoint for all routes

projectData = {};

// Require Express to run server and routes

const express = require('express');

// Start up an instance of app

const app = express();

/* Middleware*/

const bodyparser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

// Cors for cross origin allowance

const cors = require('cors');
app.use(cors());

// Initialize the main project folder

app.use(express.static('website'));
// Spin up the server

const port = 1911;
const server = app.listen(port, function (){
    console.log('Server is running and listening to port: '+ port);
});

// Get Route


app.get('/weatherData',function getdata(req,res){
    res.send(projectData);
    console.log(projectData);
});


// Post Route

app.post('/addData', function postdata(req,res){
    let data = req.body;
    projectData['newdate'] = data.newdate;
    projectData['temp'] = data.temp;
    projectData['userfeeling'] = data.userfeeling;
    projectData['city']= data.city;
    projectData['descreption'] = data.descreption;
    console.log(projectData);
});

