const http = require('http');
const port = process.env.PORT || 8080;

const path = require('path');


const express = require('express');

var mysql = require('mysql');
var app = express();


app.use(express.static(path.join('/Users/marcos/Desktop/lastick', '/resources/')));

const server = http.createServer(app).listen(port, function() {  
  console.log('Express server listening on port ' + port);
});


var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "yourusername",
  password: "yourpassword"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});