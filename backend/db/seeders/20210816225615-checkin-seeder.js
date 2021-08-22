'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Checkins', [
      { userId: 2, drinkId: 1, comment: 'Sub Par Drink', createdAt: new Date(), updatedAt: new Date() },
      { userId: 3, drinkId: 2, comment: 'One of the best drinks i\'ve ever had', createdAt: new Date(), updatedAt: new Date() },
      { userId: 4, drinkId: 3, comment: 'Pretty ok drink', createdAt: new Date(), updatedAt: new Date() },
      { userId: 5, drinkId: 4, comment: 'I\'d drive 1000 miles to get this drink', createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, drinkId: 5, comment: 'Very nice beer if someone added a review score I would give it 5 out of 7', createdAt: new Date(), updatedAt: new Date() },
      { userId: 3, drinkId: 6, comment: 'I\'m not really sure what to type here', createdAt: new Date(), updatedAt: new Date() },
      { userId: 4, drinkId: 7, comment: 'Beer!!!!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 7, drinkId: 8, comment: 'Very Nice!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 4, drinkId: 9, comment: 'New Beer who dis', createdAt: new Date(), updatedAt: new Date() },
      { userId: 5, drinkId: 10, comment: '10 out of 10 best Beer in vermont', createdAt: new Date(), updatedAt: new Date() },
      { userId: 6, drinkId: 11, comment: 'This would pair well with some Smoked Salt', createdAt: new Date(), updatedAt: new Date() },
      { userId: 6, drinkId: 12, comment: 'Chicken Wing Chicken Wing hot dog and baloney drinking this beer with the homies', createdAt: new Date(), updatedAt: new Date() },
      { userId: 6, drinkId: 13, comment: 'Beer kind of sucks but the brewery is nice', createdAt: new Date(), updatedAt: new Date() },
      { userId: 2, drinkId: 14, comment: 'Only reason to come to Vermont in the summer', createdAt: new Date(), updatedAt: new Date() },
      { userId: 3, drinkId: 15, comment: 'Ripped some gnar pow and cracked this cold one after', createdAt: new Date(), updatedAt: new Date() },
      { userId: 4, drinkId: 16, comment: 'I\'m here so i dont get fined', createdAt: new Date(), updatedAt: new Date() },
      { userId: 5, drinkId: 17, comment: 'Practice watchu talking about pratice', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Checkins', null, {});
  }
};
