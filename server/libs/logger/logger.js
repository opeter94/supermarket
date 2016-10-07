var moment = require('moment');

logRequest = function (req, res, next) {
    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    console.log(moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS')+' - '+'FROM: '+ip+' : '+req.method+' '+'['+req.url+']');
    next();
};

module.exports.logRequests = logRequest;