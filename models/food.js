'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Food.belongsToMany(models.Order, {
        through: 'OrderFood'
      });
    }
  }
  Food.init({
    itemName: DataTypes.STRING,
    itemPrice: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'Food',
  });
  return Food;
};