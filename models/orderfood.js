'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderFood extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      OrderFood.belongsTo(models.Order, {
        foreignKey: 'orderId',
        as: 'order'
      });
      OrderFood.belongsTo(models.Food, {
        foreignKey: 'foodId',
        as: 'food'
      });
    }
  }
  OrderFood.init({
    orderId: DataTypes.INTEGER,
    foodId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrderFood',
    tableName: 'OrderFood',
  });
  return OrderFood;
};