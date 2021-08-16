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
    return queryInterface.bulkInsert('Drinks', [
      { tagId: 4, storeId: 1, name: 'Tribute', imageUrl: 'https://untappd.akamaized.net/site/beer_logos/beer-563707_ea186_sm.jpeg', description: 'Our Tribute Double IPA is a celebration of hops, pure and simple. A simple and smooth malt base serves as the stage for the hops to perform. Tribute has a beautiful golden color, an aroma brimming with citrusy hops, and a deliciously smooth hop flavor and dry finish.', createdAt: new Date(), updatedAt: new Date() },
      { tagId: 3, storeId: 1, name: 'Maple Breakfast Stout', imageUrl: 'https://untappd.akamaized.net/site/beer_logos/beer-426336_de97d_sm.jpeg', description: 'Brewed with maple syrup and cold brew coffee, this wonderfully complex stout starts with a rich smooth coffee flavor, then eludes to a dark chocolate character, and finishes a hit of sweetness.', createdAt: new Date(), updatedAt: new Date() },
      { tagId: 4, storeId: 1, name: 'B-72', imageUrl: 'https://untappd.akamaized.net/site/beer_logos/beer-1677226_11130_sm.jpeg', description: 'Our B-72 New England IPA is coming at you to drop a hop bomb on your taste buds! Brewed with copious amounts of Australian and American hop varieties this brew packs a punch with its juicy citrus flavor and tropical fruit aroma.', createdAt: new Date(), updatedAt: new Date() },
      { tagId: 2, storeId: 1, name: 'Valor Ale', imageUrl: 'https://untappd.akamaized.net/site/beer_logos/beer-202330_a2613_sm.jpeg', description: 'Hoppy Amber Ale that has a malt complexity that finishes crisp and with hints of grapefruit.', createdAt: new Date(), updatedAt: new Date() },
      { tagId: 4, storeId: 1, name: 'Follow Me IPA', imageUrl: 'https://untappd.akamaized.net/site/beer_logos/beer-202330_a2613_sm.jpeg', description: 'An American IPA brewed with 5 American and Australian hop varieties. This sessionable ale is incredibly well balanced and drinkable.', createdAt: new Date(), updatedAt: new Date() },
      { tagId: 2, storeId: 1, name: 'Recruit Golden Ale', imageUrl: 'https://untappd.akamaized.net/site/beer_logos/beer-1960209_1503a_sm.jpeg', description: 'Recruit is clean, crisp, and refreshing American Golden Ale.', createdAt: new Date(), updatedAt: new Date() },
      { tagId: 6, storeId: 1, name: 'Raspberry Vermont Weiss', imageUrl: 'https://untappd.akamaized.net/site/beer_logos/beer-2637937_d6d2d_sm.jpeg', description: 'Raspberry Vermonter Weiss is a beautiful deep pink Sour Ale brewed with Vermont Ingredients & raspberries.', createdAt: new Date(), updatedAt: new Date() },
      { tagId: 4, storeId: 1, name: 'Make the Cut: Our Saving Grace', imageUrl: 'https://untappd.akamaized.net/site/beer_logos/beer-2585653_52495_sm.jpeg', description: 'Winner of the 2018 Make the Cut Homebrew Challenge. Bryan Landerman & Greg Goyette’s New England IPA is a hazy, straw colored creation dry hopped with Mosaic, Citra, and Ekuanot. Their beer delivers a mouthful of tropical juicy hops and a soft lasting citrus flavor that leaves you wanting more.', createdAt: new Date(), updatedAt: new Date() },
      { tagId: 4, storeId: 2, name: "It's Complicated Being A Wizard", imageUrl: 'https://untappd.akamaized.net/site/beer_logos/beer-860861_3dca8_sm.jpeg', description: "It's Complicated Being a Wizard is our flagship Double IPA. Pours a radiant glowing orange with which we immerse massive quantities of hops for a bold hop flavor. Brewed with Barley, Wheat Malt, and Flaked Oats. Hopped with Simcoe, Idaho 7, and Chinook for flavors and aromas of Ripe Papaya, Nectarines, Orange Zest, and Dank Cannabis.", createdAt: new Date(), updatedAt: new Date() },
      { tagId: , storeId: , name: , imageUrl: , description: , createdAt: new Date(), updatedAt: new Date() },
      { tagId: , storeId: , name: , imageUrl: , description: , createdAt: new Date(), updatedAt: new Date() },
      { tagId: , storeId: , name: , imageUrl: , description: , createdAt: new Date(), updatedAt: new Date() },



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



// { tagId: , storeId: , name: , imageUrl: , description: , createdAt: new Date(), updatedAt: new Date() },
