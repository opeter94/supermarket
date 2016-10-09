'use strict';

module.exports = function(sequelize, DataTypes) {
    var Bill = sequelize.define("Bill", {
        billId: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        }
    }, {
        classMethods: {
            associate: function(models) {
                Bill.belongsTo(models.User, {foreignKey: {name: 'userName', allowNull: false, onDelete: 'RESTRICT'}})
            }
        },
        tableName: 'bill'
    });

    return Bill;
};