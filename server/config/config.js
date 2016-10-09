var path = require('path');
var config = {};

config.clientRoot = path.join(__dirname, '..', '..', 'client');

config.db = {
    host: 'localhost',
    port: '3306',
    userName: 'supermarket',
    password: 'app',
    database: 'supermarket',
    options: {
        define: {
            host: config.db.host,
            port: config.db.port,
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