'use strict';

module.exports = function(sequelize, DataTypes) {
    var Category = sequelize.define("Category", {
        categoryId: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: false
        }
    }, {
        classMethods: {
            associate: function(models) {

            }
        },
        tableName: 'category'
    });

    return Category;
};