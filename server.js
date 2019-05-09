const express = require('express'),
      path = require('path'),
      serveStatic = require('serve-static'),
      app = express(),
      locations   = require('./routes/locations');
      
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(serveStatic(__dirname + "/dist"));
const port = process.env.PORT || 8080;
app.listen(port);
console.log('server started '+ port);

// Routes
app.use('/locations', locations);