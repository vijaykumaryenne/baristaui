const path = require('path');

//Do express stuffs...
const express = require('express');

var app = express();

var port = (process.env.PORT || 8080)

app.use('/', express.static(__dirname + '/web'));

app.listen(port, function() {
  console.log('UI listening on port ' +port);
});
