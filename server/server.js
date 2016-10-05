var express = require("express");
var app = express();
var helmet = require('helmet');
//app.use(helmet);
var router = require('./routes/routes.js');
var config = require('./config/config.js');
var logger = require('./libs/logger/logger.js');

// log info about every request, this must be done before any other middleware service(used as first middleware)
app.use(logger.logRequest);

// set express static content root to 'client' directory
app.use(express.static(config.clientRoot));

// apply routes defined in routes.js
app.use(router);

app.listen(3000, function() {
    console.log('Web server started.');
    console.log('Listening on port 3000.')
});
