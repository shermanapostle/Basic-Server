
const http = require("https");
const url = require("url");
// const StringDecoder = require("stringdecoder").StringDecoder;
const util = require ("util");
// const formidable = require ("formidable");

const server = http.createServer(function(req, res){


    console.log(http.METHODS); 
});

server.listen(1234, function(){
    console.log("Listening on port 1234");
});