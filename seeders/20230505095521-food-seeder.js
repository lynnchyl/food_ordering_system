'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Food', [
      {
        itemName: 'Burger',
        itemPrice: 10.99,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        itemName: 'Pizza',
        itemPrice: 15.99,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        itemName: 'Sandwich',
        itemPrice: 7.99,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Food', null, {});
  }
};
