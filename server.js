const express = require('express');
const app = express();
const path = require('path');

app.use( express.static(__dirname + '/dist') );
app.listen( process.env.PORT || 8081 )
app.get( '/*', function(request, response) {
  response.sendFile( path.join(__dirname + '/dist/index.html' ) );
});

console.log( "activities-generator-FE. Console Listening..." )