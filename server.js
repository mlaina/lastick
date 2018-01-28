const http = require('http');
const port = process.env.PORT || 8080;

const path = require('path');

var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
const express = require('express');

var mysql = require('mysql');
var app = express();

app.use(express.static(path.join('/Users/marcos/Desktop/lastick', '/public/')));

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


app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
