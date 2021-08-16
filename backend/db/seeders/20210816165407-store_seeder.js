'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:

    */
    return queryInterface.bulkInsert('Stores', [
      { location: 'St Albans, VT', title: '14th Star Brewing', createdAt: new Date(), updatedAt: new Date() },
      { location: 'Williston, VT', title: 'Burlington Beer Company', createdAt: new Date(), updatedAt: new Date() },
      { location: 'Shelburne, VT', title: 'Fiddlehead Brewing Company', createdAt: new Date(), updatedAt: new Date() },
      { location: 'Burlington, VT', title: 'Foam Brewers', createdAt: new Date(), updatedAt: new Date() },
      { location: 'Hinesburg, VT', title: 'Frost Beer Works', createdAt: new Date(), updatedAt: new Date() },
      { location: 'Greensboro Bend, VT', title: 'Hill Farmstead Brewery', createdAt: new Date(), updatedAt: new Date() },
      { location: 'Waitsfield, VT', title: "Lawson's Finest Liquids", createdAt: new Date(), updatedAt: new Date() },
      { location: 'Morrisville, VT', title: 'Lost Nations Brewing', createdAt: new Date(), updatedAt: new Date() },
      { location: 'Waterbury, VT', title: 'Prohibition Pig', createdAt: new Date(), updatedAt: new Date() },
      { location: 'Rutland, VT', title: 'Rutland Beer Works', createdAt: new Date(), updatedAt: new Date() },
      { location: 'Burlington, VT', title: 'Switchback Brewing Co.', createdAt: new Date(), updatedAt: new Date() },
      { location: 'Stowe, VT', title: 'The Alchemist', createdAt: new Date(), updatedAt: new Date() },
      { location: 'Stowe, VT', title: 'von Trapp Brewing', createdAt: new Date(), updatedAt: new Date() },
      { location: 'St Johnsbury', title: 'Whirligig Brewing', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Stores', null, {});
  }
};
