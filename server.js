const express = require('express'),
      path = require('path'),
      serveStatic = require('serve-static'),
      app = express(),
      locations   = require('./routes/locations');

app.use(serveStatic(__dirname + "/dist"));
const port = process.env.PORT || 5000;
app.listen(port);
console.log('server started '+ port);

// Routes
app.use('/locations', locations);