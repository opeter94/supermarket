'use strict';

module.exports = function(sequelize, DataTypes) {
    var BillElement = sequelize.define("BillElement", {
        billElementId: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        count: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        }
    }, {
        classMethods: {
            associate: function(models) {
                BillElement.belongsTo(models.Bill, {foreignKey: {name: 'billId', allowNull: false, onDelete: 'RESTRICT'}});
                BillElement.belongsTo(models.Product, {foreignKey: {name: 'productId', allowNull: false, onDelete: 'RESTRICT'}});
            }
        },
        tableName: 'billelement'
    });

    return BillElement;
};