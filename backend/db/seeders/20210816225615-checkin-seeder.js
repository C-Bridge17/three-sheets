'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Checkins', [
      { userId: 1, drinkId: 1, comment: 'One of the best beers ive ever had', createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, drinkId: 2, comment: 'One of the best drinks ive ever had', createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, drinkId: 3, comment: 'One of the best drinks ive ever had', createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, drinkId: 4, comment: 'One of the best drinks ive ever had', createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, drinkId: 5, comment: 'One of the best drinks ive ever had', createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, drinkId: 6, comment: 'One of the best drinks ive ever had', createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, drinkId: 7, comment: 'One of the best drinks ive ever had', createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, drinkId: 8, comment: 'One of the best drinks ive ever had', createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, drinkId: 9, comment: 'One of the best drinks ive ever had', createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, drinkId: 10, comment: 'One of the best drinks ive ever had', createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, drinkId: 11, comment: 'One of the best drinks ive ever had', createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, drinkId: 12, comment: 'One of the best drinks ive ever had', createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, drinkId: 13, comment: 'One of the best drinks ive ever had', createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, drinkId: 14, comment: 'One of the best drinks ive ever had', createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, drinkId: 15, comment: 'One of the best drinks ive ever had', createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, drinkId: 16, comment: 'One of the best drinks ive ever had', createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, drinkId: 17, comment: 'One of the best drinks ive ever had', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Checkins', null, {});
  }
};
