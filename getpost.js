var express = require('express');
var app = express();

app.get("/", function(req,res,next){
    res.send("THIS IS GET METHOD");


});

app.post("/", function(req,res,next){
    res.send("THIS IS POST METHOD");


});



app.listen(5555, function(){
    console.log("Started on port 5555");

});