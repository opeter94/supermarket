'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('City', {
        cityId: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        zip: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: false
        }
    }, {
        tableName: 'city'
    });
};