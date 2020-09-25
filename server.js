// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
const server = app.listen(port,()=>{console.log(`Runing server on localhost:${port}`)});

//Endpoint for GET DATA
app.get("/all", getData);
function getData(req,res){
    res.send(projectData);
}
app.get("/recent", getRecentData);
function getRecentData(req,res){
    res.send(projectData[projectData.length-1]);
}
//Endpoint for ADD DATA
app.post("/add", addData);
function addData(req,res){
    const newEntry = {
        temp : req.body.temp,
        date : req.body.date,
        res : req.body.res
    };
    projectData.push(newEntry);
    res.send(projectData);
}