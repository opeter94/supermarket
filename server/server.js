var express = require("express");
var app = express();
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var pageNotFoundRouter = require('./routes/pagenotfound');
var config = require('./config/config');
var logger = require('./libs/logger/logger');
var bodyParser = require('body-parser');

// log info about every request, this must be done before any other middleware service(used as first middleware)
app.use(logger.logRequest);

// set express static content root to 'client' directory
app.use(express.static(config.clientRoot));

// expose the html body data on req.body
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// apply defined routes from routes folder
app.use(indexRouter);
app.use(loginRouter);
// pageNotFound must be the last one
app.use(pageNotFoundRouter);

app.listen(3000, function() {
    console.log('Web server started.');
    console.log('Listening on port 3000.')
});
