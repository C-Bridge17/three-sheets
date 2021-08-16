'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Tags', [
      { type: 'Lager', createdAt: new Date(), updatedAt: new Date() },
      { type: 'Ale', createdAt: new Date(), updatedAt: new Date() },
      { type: 'Stout', createdAt: new Date(), updatedAt: new Date() },
      { type: 'IPA', createdAt: new Date(), updatedAt: new Date() },
      { type: 'Pilsner', createdAt: new Date(), updatedAt: new Date() },
      { type: 'Sour', createdAt: new Date(), updatedAt: new Date() },
      { type: 'Pale Ale', createdAt: new Date(), updatedAt: new Date() },
      { type: 'Kölsch', createdAt: new Date(), updatedAt: new Date() },
      { type: 'Pumpkin', createdAt: new Date(), updatedAt: new Date() },
      { type: 'Hefeweizen', createdAt: new Date(), updatedAt: new Date() },
      { type: 'Porter', createdAt: new Date(), updatedAt: new Date() }
    ], {});

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
