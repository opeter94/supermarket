var path = require('path');
var config = {};

config.clientRoot = path.join(__dirname, '..', '..', 'client');

var host = 'localhost';
var port = '3306';
config.db = {
    host: host,
    port: port,
    userName: 'supermarket',
    password: 'app',
    database: 'supermarket',
    options: {
        define: {
            host: host,
            port: port,
            dialect: 'mysql',
            pool: {
                max: 5,
                min: 1,
                idle: 10000
            },
            timestamps: false,
            paranoid: false,
            underscored: false,
            freezeTableName: true
        }
    }
};

module.exports = config;