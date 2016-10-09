'use strict';

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        userName: {
            type: DataTypes.STRING(45),
            allowNull: false,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        lastName: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        email: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        address: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(45),
            allowNull: false
        }
    }, {
        classMethods: {
            associate: function(models) {
                User.belongsTo(models.City, {foreignKey: {name: 'cityId', allowNull: false, onDelete: 'RESTRICT'}})
            }
        },
        tableName: 'user'
    });

    return User;
};

