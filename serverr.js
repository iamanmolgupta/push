var express = require('express');   ///import express
var app = express();               //creating instance of express
var router = require('./router/route'); 
var router1 = require('./router/imageRouter')   //import router
var bodyParser = require('body-parser');
const mongoose = require('mongoose');  
const cors = require('cors');

app.use(express.static('uploads'));

app.use(cors());
//connect with the mongodb
mongoose.connect("mongodb://localhost:27017/anmoldatabase",{ useNewUrlParser: true });

//setup view engine
app.set('view engine', 'ejs');

//use bodyparser to get the required data
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

//use the router to route the path
app.use("/",router);

app.use("/timeline",router1);

//server
app.listen(8080,()=>{
  console.log("server is running");
})