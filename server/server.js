var express = require("express");
var app = express();
var loginRouter = require('./routes/login');
var pageNotFoundRouter = require('./routes/pagenotfound');
var registerRouter = require('./routes/register');
var adminRouter = require('./routes/admin');
var config = require('./config/config');
var logger = require('./libs/logger/logger');
var bodyParser = require('body-parser');
var models = require('./models/models');

// log info about every request, this must be done before any other middleware service(used as first middleware)
app.use(logger.logRequests);

// set express static content root to 'client' directory
app.use(express.static(config.clientRoot));

// expose the html body data on req.body, parse as json
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// apply defined routes from routes folder
app.use(loginRouter);
app.use(registerRouter);
app.use(adminRouter);
// pageNotFound must be the last one
app.use(pageNotFoundRouter);

models.sequelize.sync().then(function () {
    app.listen(3000, function () {
        console.log('Web server started.');
        console.log('Listening on port 3000.')
    })
});
