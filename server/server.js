var express = require("express");
var app = express();
var path = require('path');
var moment = require('moment');

// set the path of 'public' files in express
app.use(express.static(path.join(__dirname, '..', 'app')));
//app.use(express.static(path.join(__dirname, '..', 'app', 'pagenotfound')));
//app.use(express.static(path.join(__dirname, '..', 'app', 'public')));

// log info about the request
app.use(function(req, res, next) {
    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    console.log(moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS')+' - '+'FROM: '+ip+' : '+req.method+' '+'['+req.url+']');
    next();
});

var indexHtml = path.join(__dirname, '..', 'app', 'views', 'index.html');
app.get('/', function (req, res) {
    res.sendFile(indexHtml);
});

var page404 = path.join(__dirname, '..', 'app', 'pagenotfound', 'pagenotfound.html');
app.all('*', function(req, res) {
    res.sendFile(page404);
});

app.listen(3000, function() {
    console.log('Web server started.');
    console.log('Listening on port 3000.')
});
