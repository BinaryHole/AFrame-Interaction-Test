// constants
const express = require('express');
const app  = express();
const http = require('http');
const port = 8080;
const server = http.createServer(app);

// start server
server.listen(port, function() {
  console.log("Express server listening on port " + port);
});

// set public folder to the root folder
app.use(express.static(__dirname + '/Pages'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/Pages/index.html');
});
