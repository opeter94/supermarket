'use strict';

module.exports = function(sequelize, DataTypes) {
    var Product = sequelize.define("Product", {
        productId: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        }
    }, {
        classMethods: {
            associate: function(models) {
                Product.belongsTo(models.Category, {foreignKey: {name: 'categoryId', allowNull: false, onDelete: 'RESTRICT'}})
            }
        },
        tableName: 'product'
    });

    return Product;
};