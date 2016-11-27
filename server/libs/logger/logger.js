var moment = require('moment');

var logFileRequests = false;

logRequests = function (req, res, next) {
    if (!logFileRequests && req.url.includes('.')) {
        next();
    } else {
        var ip = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
        console.log(moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS')+' - '+'FROM: '+ip+' : '+req.method+' '+'['+req.url+']');
        next();
    }
};

module.exports.logRequests = logRequests;